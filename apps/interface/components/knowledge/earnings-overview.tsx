interface EarningsOverviewProps {
  total: number;
  daily: number;
}

export default function EarningsOverview(props: EarningsOverviewProps): JSX.Element {
  return (
    <div>
      <p className=''>My Earnings</p>
      <p className='text-4xl font-bold'>
        {props.total.toFixed(2)}{' '}
        <span className=' text-sm font-normal text-danger'>{`+${props.daily.toFixed(2)}`}</span>
      </p>
    </div>
  );
}
