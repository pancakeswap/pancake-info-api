interface Volume {
  ETH: string
  [propname: string]: string
}

export default interface ReturnData {
  volume_24h: Volume
  price_last: string
}
