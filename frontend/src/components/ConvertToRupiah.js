const ConvertToRupiah = (rawPrice) => {
  let temp = (rawPrice).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })

  return(
    <>
      {temp}
    </>
  )
} 

export default ConvertToRupiah