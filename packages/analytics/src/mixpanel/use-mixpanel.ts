import { useContext } from 'react';
import { mixpanelContext } from './mixpanel-context.js';

export const useMixpanel = () => {
  const mixpanel = useContext(mixpanelContext);

  return {
    addGroup: mixpanel.add_group,
    alias: mixpanel.alias,
    clearOptInOutTracking: mixpanel.clear_opt_in_out_tracking,
    getGroup: mixpanel.get_group,
    hasOptedInTracking: mixpanel.has_opted_in_tracking,
    hasOptedOutTracking: mixpanel.has_opted_out_tracking,
    identify: mixpanel.identify,
    optInTracking: mixpanel.opt_in_tracking,
    optOutTracking: mixpanel.opt_out_tracking,
    register: mixpanel.register,
    registerOnce: mixpanel.register_once,
    removeGroup: mixpanel.remove_group,
    reset: mixpanel.reset,
    setGroup: mixpanel.set_group,
    timeEvent: mixpanel.time_event,
    track: mixpanel.track,
    trackForms: mixpanel.track_forms,
    trackLinks: mixpanel.track_links,
    trackWithGroups: mixpanel.track_with_groups,
    unregister: mixpanel.unregister,
    people: mixpanel.people,
  };
};
