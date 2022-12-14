export interface IDefault {
  id: number
  user_id: number
  product_id: number
  order_id: number
  qty: number
  price: number
  product: IProduct
  created_at: string
  updated_at: string
  shipping_status: string
  tracking_code: string
  tracking_url: string
  order: IOrder
}

export interface IProduct {
  americanas_price: number
  americanas_sku: string
  casasbahia_price: number
  casasbahia_sku: string
  category_id: number
  color: string
  common: number
  created_at: string
  description: null
  google_sku: string
  id: number
  magalu_price: number
  magalu_sku: string
  media: Array<IMedia>
  memory: string
  name: string
  ponto_price: number
  ponto_sku: string
  price: number
  stock: null
  updated_at: string
  slug: string
  category_slug: string
  blackfriday: number | boolean
}

export interface IMedia {
  collection_name: string
  conversions_disk: string
  created_at: string
  custom_properties: []
  disk: string
  file_name: string
  generated_conversions: []
  id: number
  manipulations: []
  mime_type: string
  model_id: number
  model_type: string
  name: string
  order_column: number
  original_url: string
  preview_url: string
  responsive_images: []
  size: number
  updated_at: string
  uuid: string
}
export interface IOrder {
  id: number
  user_id: number
  address_id: number
  invoice_id: number
  total: number
  method: string
  created_at: string
  updated_at: string
  address: IAddress
  user: IUser
  invoice: IInvoice
}

export interface IAddress {
  id: number
  user_id: number
  postal_code: string
  address: string
  number: number
  complement: string
  neighborhood: string
  city: string
  uf: string
  created_at: string
  updated_at: string
}

export interface IUser {
  id: number
  name: string
  email?: string
  profile_photo_url: string
  type: number
  promotion: boolean
  mobile_phone: string
}

export interface IUserOrder {
  birthday: string
  block_matches_until: null
  created_at: string
  current_team_id: null
  deleted_at: null
  document: string
  email: string
  email_verified_at: null
  expires_at: null
  id: number
  is_admin: boolean
  is_blocked: boolean
  is_recipient: number
  is_subscriber: boolean
  is_validated: boolean
  name: string
  note: null
  profile_photo_path: null
  updated_at: string
}

export interface IInvoice {
  id: number
  order_id: number
  invoice_id: string
  pdf: string
  link: string
  brcode: string
  status: string
  amount: number
  created_at: string
  updated_at: string
}

export interface ICategory {
  created_at: string
  description: null
  id: number
  is_available: boolean
  name: string
  products: Array<IProduct>
  updated_at: string
  slug: string
}

export interface Product {
  id: number
  amount: number
}

export interface ArrayProduct {
  id: number
  amount: number
  priceFormated: number
  subTotal: number
  product: IProduct
}

export interface UserData {
  id: number
  name: string
  email: string
  email_verified_at: null | string
  current_team_id: null | string
  profile_photo_path: null | string
  creat_at: string
  updated_at: string
  document: string
  external_id: string
  birthdate: string
  mobile_phone: string
  code: null | string | number
  type: number
  profile_photo_url: string
}

export interface Address {
  address: {
    address: string
    city: string
    complement: string | null
    created_at: string
    id: number
    neighborhood: string
    number: number
    postal_code: string
    uf: string
    updated_at: string
    user_id: number
  }
}

export interface ProductPayment {
  product_id: number
  price: number
  qty: number
}

export interface UserData {
  address: Address
  address_id: number
  created_at: string
  id: number
  invoice: IInvoice
  invoice_id: number
  method: string
  total: number
  updated_at: string
  user_id: number
}

export interface GetInfoCredit {
  address_id: number
  amount: number
  card_cvv: number
  card_holder_name: string
  card_number: number
  document: string
  expiration_date: string
  items: Array<{}>
  shippingPrice: number
  user_id: number
  installments: number
  card_holder_birthdate?: string
  card_holder_phone?: string
}
