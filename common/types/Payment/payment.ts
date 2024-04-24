/**
 *
 * @param {String} merchant_oid - Mağaza sipariş no: Satış işlemi için belirlediğiniz benzersiz sipariş numarası.
 * @param {Number} payment_amount - Ödeme tutarı: Siparişe ait toplam ödeme tutarı.(Tutarı 100 ile çarparak göndermelisiniz)
 * @param {Number} no_installment - Taksit: Taksit sayısı. (Tek çekim için 1 gönderilmelidir.)
 * @param {Number} max_installment - 0,2,3,4,5,6,7,8,9,10,11,12 Sıfır (0) gönderilmesi durumunda yürürlükteki en fazla izin verilen taksit geçerli olur
 */

export interface IPaymentToken {
  merchant_id: string;
  merchant_key: string;
  merchant_salt: string;
  user_ip: string;
  merchant_oid: string;
  email: string;
  payment_amount: number;
  currency: string;
  user_basket: string;
  no_installment: number;
  max_installment: number;
  paytr_token: string;
  user_name: string;
  user_phone: string;
  user_address: string;
  merchant_ok_url: string;
  merchant_fail_url: string;
  test_mode: number; // 0: Test modu kapalı, 1: Test modu açık
  debug_on?: number; // 0: Hata mesajlarını gösterme, 1: Hata mesajlarını göster
}
