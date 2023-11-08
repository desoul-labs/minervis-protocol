import type { InitOptions } from '@wandb/sdk/dist/sdk/wandb_init';
import { WandbTracer } from '@wandb/sdk/integrations/langchain';
import { CallbackManager } from 'langchain/callbacks';
import type { BaseChain } from 'langchain/chains';

export function wandbTracer(options?: Omit<InitOptions, 'project' | 'settings'>): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value as BaseChain['call'];
    const decoratedMethod: BaseChain['call'] = async function (this: BaseChain, values, config, tags) {
      const callback = await WandbTracer.init({
        ...options,
        project: process.env.WANDB_PROJECT,
        entity: process.env.WANDB_ENTITY,
      });
      if (!callback) {
        return originalMethod.apply(this, [values, config, tags]);
      }

      let _config = config;
      if (config instanceof CallbackManager) {
        _config = [config, callback];
      } else if (config instanceof Array) {
        _config = [...config, callback];
      } else {
        _config = callback;
      }
      const result = await originalMethod.apply(this, [values, _config, tags]);

      await WandbTracer.finish();
      return result;
    };

    descriptor.value = decoratedMethod;
    return descriptor;
  };
}
