<div 
style={{
  width: '200px',
  height: '150px'
}}
>
<Chart className='graph' data={data} axes={axes} />
</div>

const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [[0, 1]]
      },
      {
        label: 'Series 2',
        data: [[0, 3]]
      }
    ],
    []
  )
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
