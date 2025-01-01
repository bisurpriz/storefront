import clsx from "clsx";
import { FC } from "react";

interface DistanceSalesContractProps {
  aliciAdi: string;
  teslimatAdresi: string;
  telefon: string;
  email: string;
  urun: string;
  urunAdet: number;
  urunFiyati: number;
  kargoTutari: number;
  toplamFiyat: number;
  siparisTarihi: string;
  teslimatSuresi: string;
  kargoTeslimSuresi: string;
  saticiAdi: string;
  saticiAdresi: string;
  saticiTelefonu: string;
  saticiFaks: string;
  saticiEmail: string;
}

const DistanceSalesContract: FC<DistanceSalesContractProps> = ({
  aliciAdi,
  email,
  kargoTeslimSuresi,
  kargoTutari,
  saticiAdi,
  saticiAdresi,
  saticiEmail,
  saticiFaks,
  saticiTelefonu,
  siparisTarihi,
  telefon,
  teslimatAdresi,
  teslimatSuresi,
  toplamFiyat,
  urun,
  urunAdet,
  urunFiyati,
}) => {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-start justify-start gap-6 p-4">
      <div
        className={clsx(
          "max-h-60 w-full overflow-y-auto rounded-md bg-stone-50 px-12 py-4 shadow-inner",
          "[&>p]:text-xs",
          "[&>h2]:text-base",
          "[&>h1]:text-lg",
          "[&>*]:my-2",
          "[&>table]:w-full",
          "[&>table>tbody>tr>td]:border [&>table>tbody>tr>td]:px-2 [&>table>tbody>tr>td]:py-2 [&>table>tbody>tr>td]:text-left [&>table>tbody>tr>td]:text-xs [&>table>tbody>tr>td]:font-semibold",
          "[&>table>thead>tr>th]:border [&>table>thead>tr>th]:px-2 [&>table>thead>tr>th]:py-2 [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:text-xs [&>table>thead>tr>th]:font-semibold",
          "[&>li]:py-2 [&>ul]:text-xs",
        )}
      >
        <h1>Ön Bilgilendirme Formu</h1>
        <h2>1. TARAFLAR VE KONU</h2>
        <p>
          İşbu Ön Bilgilendirme Formu'nun konusu, Alıcı ve Satıcı arasındaki
          Sözleşme'ye ilişkin Kanun ve Yönetmelik hükümleri uyarınca
          bilgilendirilmesidir. Ayrıca Yönetmelik uyarınca yer verilmesi zorunlu
          olan hususlar Ön Bilgilendirme Formu'nda yer almaktadır.
        </p>
        <p>
          ALICI, Ön Bilgilendirme Formu ve Sözleşme'ye ilişkin bilgileri
          üyeliğinin bağlı olduğu "Hesabım" sayfasından takip edebilecek olup
          değişen bilgilerini bu sayfa üstünden güncelleyebilecektir. Ön
          Bilgilendirme Formu ve Sözleşme'nin bir nüshası Alıcı'nın üyelik
          hesabında mevcuttur ve talep edilmesi halinde ayrıca elektronik posta
          ile de gönderilebilecektir.
        </p>
        <h2>2. TANIMLAR</h2>
        <p>
          Ön Bilgilendirme Formu ve Sözleşme'nin uygulanmasında ve
          yorumlanmasında aşağıda yazılı terimler karşılarındaki yazılı
          açıklamaları ifade edeceklerdir.
        </p>
        <table>
          <tbody>
            <tr>
              <td>ALICI</td>
              <td>
                Bir Mal veya Hizmet'i ticari veya mesleki olmayan amaçlarla
                edinen, kullanan veya yararlanan gerçek kişiyi,
              </td>
            </tr>
            <tr>
              <td>Bakanlık</td>
              <td>Türkiye Cumhuriyeti Ticaret Bakanlığı'nı,</td>
            </tr>
            <tr>
              <td>Banka</td>
              <td>
                5411 sayılı Bankacılık Kanunu uyarınca kurulan lisanslı
                kuruluşları,
              </td>
            </tr>
            <tr>
              <td>Bonnmarşe veya Elektronik Ticaret Aracı Hizmet Sağlayıcı </td>
              <td>
                Oluşturduğu sistem ile Satıcı'nın Ürün/Hizmet'i satışa sunduğu
                Platform'u işleten ve Satıcı adına mesafeli sözleşme kurulmasına
                aracılık eden Bonnmarşe Grup Danışmanlık İletişim ve Satış
                Ticaret Anonim Şirketi'ni,
              </td>
            </tr>
            <tr>
              <td>Hizmet</td>
              <td>
                Bir ücret veya menfaat karşılığında yapılan ya da yapılması
                taahhüt edilen Ürün sağlama dışındaki her türlü tüketici
                işleminin konusunu,
              </td>
            </tr>
            <tr>
              <td>Kanun</td>
              <td>6502 sayılı Tüketicinin Korunması Hakkında Kanun'u,</td>
            </tr>
            <tr>
              <td>Kargo Şirket</td>
              <td>
                Ürün'ün Alıcı'ya ulaştırılmasını, iade süreçlerinde Alıcı'dan
                alınarak Satıcı veya Bonnmarşe'ye ulaştırılmasını sağlayan
                anlaşmalı kargo veya lojistik şirketini,
              </td>
            </tr>
            <tr>
              <td>Ön Bilgilendirme Formu</td>
              <td>
                Sözleşme kurulmadan ya da buna karşılık herhangi bir teklif
                Alıcı tarafından kabul edilmeden önce Alıcı'yı Yönetmelik'te
                belirtilen asgari hususlar konusunda bilgilendirmek için
                hazırlanan formu,
              </td>
            </tr>
            <tr>
              <td>Platform</td>
              <td>
                Bonnmarşe'ye ait www.bonnmarse.com adlı internet sitesini ve
                mobil uygulamasını,
              </td>
            </tr>
            <tr>
              <td>Satıcı</td>
              <td>
                Kamu tüzel kişileri de dahil olmak üzere ticari veya mesleki
                amaçlarla tüketiciye Ürün/Hizmet sunan ya da Ürün/Hizmet sunanın
                adına ya da hesabına hareket eden ve aşağıda bilgileri bulunan
                gerçek ve/veya tüzel kişiyi,
              </td>
            </tr>
            <tr>
              <td>Sözleşme</td>
              <td>Satıcı ve Alıcı arasında akdedilen Sözleşme'yi,</td>
            </tr>
            <tr>
              <td>Ürün</td>
              <td>
                Alışverişe konu olan taşınır eşya, konut veya tatil amaçlı
                taşınmaz mallar ile elektronik ortamda kullanılmak üzere
                hazırlanan yazılım, ses, görüntü ve benzeri her türlü gayri
                maddi malı,
              </td>
            </tr>
            <tr>
              <td>Yönetmelik</td>
              <td>Mesafeli Sözleşmeler Yönetmeliği'ni ifade eder.</td>
            </tr>
          </tbody>
        </table>
        <h2>3. ALICI, SATICI VE ELEKTRONİK TİCARET ARACI HİZMET SAĞLAYICI</h2>
        <h2>ALICI BİLGİLERİ</h2>
        <table>
          <tbody>
            <tr>
              <td>Teslim Edilecek Kişi</td>
              <td>{aliciAdi}</td>
            </tr>
            <tr>
              <td>Teslimat Adresi</td>
              <td>{teslimatAdresi}</td>
            </tr>
            <tr>
              <td>Telefon</td>
              <td>{telefon}</td>
            </tr>
            <tr>
              <td>Faks</td>
              <td></td>
            </tr>
            <tr>
              <td>E-posta/Kullanıcı Adı</td>
              <td>{email}</td>
            </tr>
          </tbody>
        </table>
        <h2>SATICI BİLGİLERİ</h2>
        <table>
          <tbody>
            <tr>
              <td>Satıcının Ticaret Unvanı / Adı ve Soyadı </td>
              <td>{saticiAdi}</td>
            </tr>
            <tr>
              <td>Satıcının Adresi </td>
              <td>{saticiAdresi}</td>
            </tr>
            <tr>
              <td>Satıcının Mersis Numarası</td>
              <td></td>
            </tr>
            <tr>
              <td>Satıcının Vergi Kimlik Numarası </td>
              <td></td>
            </tr>
            <tr>
              <td>Satıcının Telefonu </td>
              <td>{saticiTelefonu}</td>
            </tr>
            <tr>
              <td>Satıcının Faks Numarası</td>
              <td>{saticiFaks}</td>
            </tr>
            <tr>
              <td>Satıcı KEP ve E-posta Bilgileri </td>
              <td>{saticiEmail}</td>
            </tr>
          </tbody>
        </table>
        <h2>ELEKTRONİK TİCARET ARACI HİZMET SAĞLAYICI BİLGİLERİ</h2>
        <table>
          <tbody>
            <tr>
              <td>Elektronik Ticaret Aracı Hizmet Sağlayıcı Unvanı </td>
              <td>Bonnmarşe</td>
            </tr>
            <tr>
              <td>Elektronik Ticaret Aracı Hizmet Sağlayıcı Adresi</td>
              <td>Yıldıztepe mah. 162.cadde 21/A Ankara</td>
            </tr>
            <tr>
              <td>
                Elektronik Ticaret Aracı Hizmet Sağlayıcı Mersis Numarası{" "}
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                Elektronik Ticaret Aracı Hizmet Sağlayıcı Vergi Kimlik Numarası{" "}
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Elektronik Ticaret Aracı Hizmet Sağlayıcı Telefonu </td>
              <td></td>
            </tr>
            <tr>
              <td>Elektronik Ticaret Aracı Hizmet Sağlayıcı Faks Numarası </td>
              <td></td>
            </tr>
            <tr>
              <td>
                Elektronik Ticaret Aracı Hizmet Sağlayıcı Şikâyet/Öneri
                Kanalları{" "}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <h2>4. ÜRÜN/HİZMET BİLGİLERİ</h2>
        <p>
          4.1. Ürün/Hizmet'in temel özellikleri (türü, miktarı, marka/modeli,
          rengi, adedi, fiyatı) Platform'da yer almakta olup Platform üzerinden
          detaylı şekilde incelenebilecektir.
        </p>
        <p>
          4.2. Ürün/Hizmet karşılığında ödenecek tüm tutarlar (tüm vergiler
          dahil satış fiyatı, kargo bedeli, taksit farkı tutarı, açık pazar
          ve/veya diğer butiklerinden eş zamanlı olarak gerçekleştirilen
          alışverişlerde hak kazanılan toplam indirim tutarı vb.) aşağıdaki
          tabloda gösterilmiştir.
        </p>
        <table>
          <thead>
            <tr>
              <th>Ürün/Hizmet Açıklaması </th>
              <th>Adet</th>
              <th>Peşin Fiyatı</th>
              <th>Ara Toplam (KDV Dahil)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{urun}</td>
              <td>{urunAdet}</td>
              <td>{urunFiyati} TL</td>
              <td>{toplamFiyat} TL</td>
            </tr>
            <tr>
              <td>Kargo Tutarı</td>
              <td></td>
              <td></td>
              <td>{kargoTutari} TL</td>
            </tr>
            <tr>
              <td>Toplam</td>
              <td></td>
              <td></td>
              <td>{toplamFiyat} TL</td>
            </tr>
          </tbody>
        </table>
        <p>
          Teslim Şartları ürün sayfasında belirtildiği şekilde uygulanacaktır.
        </p>
        <p>
          *Sözleşme ve ilgili mevzuat hükümlerinde yer alan istisnalar saklıdır.
        </p>
        <p>
          **Belirtilen süre teslimatın taahhüdü değildir, satıcı tarafından
          kargo şirketine teslim edilme süresini ifade eder.
        </p>
        <p>
          4.3. SÖZ KONUSU ÜRÜN BEDELİ, "BONNMARŞE ALICI GÜVENCESİ" KAPSAMINDA
          SATICI ADINA, Bonnmarşe TARAFINDAN ALICI'DAN TAHSİL EDİLMEKTEDİR.
          ALICI MALIN BEDELİNİ Bonnmarşe'YE ÖDEMEKLE, ÜRÜN BEDELİNİ SATICI'YA
          ÖDEMİŞ SAYILACAK VE BİR DAHA ÖDEME YÜKÜMLÜLÜĞÜ ALTINA GİRMEYECEKTİR.
          ALICI'NIN İLGİLİ MEVZUAT KAPSAMINDA İADE HAKLARI SAKLIDIR.
        </p>
        <h2>5. GENEL HÜKÜMLER</h2>
        <p>
          5.1. Satıcı, Ürün/Hizmet'i eksiksiz, siparişte belirtilen niteliklere
          uygun ve varsa garanti belgeleri, kullanım kılavuzları ile mevzuat
          gereği Ürün/Hizmet'le birlikte teslim etmesi gereken sair bilgi ve
          belgeler ile teslim etmeyi kabul, beyan ve taahhüt eder.
        </p>
        <p>
          5.2. Ürün, Alıcı veya Alıcı tarafından belirlenen üçüncü kişiye,
          taahhüt edilen teslim süresi içerisinde ve her halükârda 30 (otuz)
          günlük yasal süreyi aşmamak koşulu ile, Alıcı'nın Platform'da
          belirtmiş olduğu teslimat adresine Kargo Şirketi tarafından teslim
          edilir. Bu süre içerisinde Satıcı'nın edimini yerine getirmemesi
          durumunda Alıcı Sözleşme'yi feshedebilecektir. Ancak Alıcı'nın isteği
          veya kişisel ihtiyaçları doğrultusunda hazırlanan Ürün/Hizmet
          satışlarında teslim süresi ilgili 30 (otuz) günü aşabilecektir.
          Ayrıca, sipariş durumu "Ön Sipariş" veya "Sipariş Üzerine Üretim"
          olarak belirtilen Ürün/Hizmet için teslimat süresi de 30 (otuz) günü
          aşabilecek olup Alıcı, Alıcı'nın isteği veya kişisel ihtiyaçları
          doğrultusunda hazırlanan "Sipariş Üzerine Üretim" ya da "Ön Sipariş"
          statüsünde olan bir Ürün/Hizmet satın aldığında teslimatın 30 (otuz)
          gün içerisinde yapılmaması dolayısıyla Sözleşme'yi feshedemeyecektir.
        </p>
        <p>
          5.3. Satıcı Ürün'ü Kargo Şirketi aracılığı ile Alıcı'ya göndermekte ve
          teslim ettirmektedir. Kargo Şirketi'nin Alıcı'nın bulunduğu yerde
          şubesi olmaması halinde Alıcı'nın Ürün'ü Kargo Şirketi'nin Satıcı
          tarafından bildirilen yakın bir diğer şubesinden teslim alması
          gerekmektedir.
        </p>
        <p>
          5.5. Alıcı'nın herhangi bir nedenle Ürün/Hizmet'i teslim almaması
          halinde, Alıcı'nın Ürün/Hizmet'i iade ettiği kabul edilecek olup bu
          halde, varsa teslimat masrafları da dâhil olmak üzere Alıcı'dan tahsil
          edilen tüm ödemeler yasal süresi içerisinde Alıcı'ya iade edilecektir.
        </p>
        <p>
          5.6. Alıcı veya Alıcı tarafından belirlenen üçüncü kişinin teslim
          anında adreste bulunmaması durumunda Alıcı'nın Ürün/Hizmet'i geç
          teslim almasından ve/veya hiç teslim almamasından kaynaklanan
          zararlardan ve giderlerden Satıcı sorumlu değildir.
        </p>
        <p>
          5.7. Ürün/Hizmet'in teslimat masrafları aksine bir hüküm yoksa
          Alıcı'ya aittir. Satıcı, Platform'da teslimat ücretinin kendisince
          karşılanacağını beyan etmişse teslimat masrafları Satıcı'ya ait
          olacaktır.
        </p>
        <p>
          5.8. Satıcı, Sözleşme'den doğan ifa yükümlülüğünün süresi dolmadan
          Alıcı'yı Platform üzerinden bilgilendirmek ve açıkça onayını almak
          suretiyle muadil bir Ürün/Hizmet tedarik edebilecektir.
        </p>
        <p>
          5.9. Ürün/Hizmet ediminin yerine getirilmesinin imkansızlaştığı
          hallerde Satıcı'nın bu durumu öğrendiği tarihten itibaren 3 (üç) gün
          içinde Alıcı'ya yazılı olarak veya veri saklayıcısı ile bildirmesi ve
          varsa teslimat masrafları da dâhil olmak üzere tahsil edilen tüm
          ödemeleri bildirim tarihinden itibaren en geç 14 (ondört) gün içinde
          iade etmesi zorunludur. Ürün/Hizmet'in stokta bulunmaması durumu,
          Ürün/Hizmet ediminin yerine getirilmesinin imkânsızlaşması olarak
          kabul edilmez.
        </p>
        <p>
          5.10. Alıcı, Ürün'ü teslim almadan önce muayene edecek; ezik, kırık,
          ambalajı yırtılmış vb. hasarlı, ayıplı veya eksik Ürün/Hizmet'i teslim
          almayacaktır. Teslim alınan Ürün/Hizmet'in hasarsız ve sağlam olduğu
          kabul edilecektir. Teslimden sonra Ürün'ün özenle korunması borcu,
          Alıcı'ya aittir. Cayma hakkı kullanılacaksa Ürün/Hizmet kullanılmamalı
          ve Ürün/Hizmet faturası ve teslim sırasında Alıcı'ya iletilen diğer
          tüm belgeler (örneğin garanti belgesi, kullanım kılavuzu vb.) ile
          birlikte iade edilmesi gerekmektedir.
        </p>
        <p>
          5.11. Alıcı, Sözleşme konusu bedeli ödemekle yükümlü olup, herhangi
          bir nedenle Sözleşme konusu bedelin ödenmemesinin ve/veya Banka
          kayıtlarında iptal edilmesinin Satıcı'nın Ürün/Hizmet'i teslim
          yükümlülüğü ile Sözleşme'den kaynaklanan sair yükümlülüklerinin sona
          ereceğini kabul, beyan ve taahhüt eder. Alıcı, herhangi bir sebeple
          Banka tarafından başarısız kodu gönderilen ancak buna rağmen Banka
          tarafından Satıcı'ya yapılan ödemelere ilişkin olarak, Satıcı'nın
          herhangi bir sorumluluğunun bulunmadığını kabul, beyan ve taahhüt
          eder.
        </p>
        <p>
          5.12. Alıcı, Ürün'ün teslim edilmesinden sonra Alıcı'ya ait kredi
          kartının yetkisiz kişilerce haksız kullanılması sonucunda Sözleşme
          konusu bedelin ilgili Banka tarafından Satıcı'ya ödenmemesi halinde,
          Alıcı Ürün'ü 3 (üç) gün içerisinde iade masrafları Alıcı'ya ait olacak
          şekilde Satıcı'ya iade edeceğini kabul, beyan ve taahhüt eder.
        </p>
        <p>
          5.13. Sözleşme kapsamında herhangi bir nedenle Alıcı'ya bedel iadesi
          yapılması gereken durumlarda, Alıcı, ödemeyi kredi kartı ile yapmış
          olması halinde, Satıcı tarafından kredi kartına iade edilen tutarın
          banka tarafından Alıcı hesabına yansıtılmasına ilişkin ortalama
          sürecin 2 (iki) ile 3 (üç) haftayı bulabileceğini, bu tutarın Satıcı
          tarafından Banka'ya iadesinden sonra Alıcı'nın hesaplarına yansıması
          halinin tamamen Banka işlem süreci ile ilgili olduğunu ve olası
          gecikmelerde Banka'nın sorumlu olduğunu ve bunlar için Bonnmarşe'yi ve
          Satıcı'yı sorumlu tutamayacağını kabul, beyan ve taahhüt eder.
        </p>
        <p>
          5.14. Alıcı ile sipariş esnasında kullanılan kredi kartı hamilinin
          aynı kişi olmaması veya Ürün/Hizmet'in Alıcı'ya tesliminden evvel,
          siparişte kullanılan kredi kartına ilişkin güvenlik açığı tespit
          edilmesi halinde, kredi kartı hamiline ilişkin kimlik ve iletişim
          bilgilerini, siparişte kullanılan kredi kartının bir önceki aya ait
          ekstresini yahut kart hamilinin Banka'dan kredi kartının kendisine ait
          olduğuna ilişkin yazıyı ibraz etmesini Alıcı'dan talep
          edilebilecektir. Alıcı'nın talebe konu bilgi/belgeleri temin etmesine
          kadar geçecek sürede sipariş dondurulacak olup, söz konusu taleplerin
          24 (yirmidört) saat içerisinde karşılanmaması halinde ise Satıcı,
          siparişi iptal etme hakkını haizdir.
        </p>
        <p>
          5.16. Sipariş edilmeyen Ürün/Hizmet'in gönderilmesi durumunda,
          Alıcı'ya karşı herhangi bir hak ileri sürülemez. Bu hallerde,
          Alıcı'nın sessiz kalması ya da söz konusu Ürün/Hizmet'i kullanmış
          olması, sözleşmenin kurulmasına yönelik kabul beyanı olarak
          yorumlanamaz.
        </p>
        <p>
          5.17. Alıcı'nın sipariş edebileceği Ürün/Hizmet adetlerine
          Platform'dan yapılacak duyurularla kısıt getirilebilir. Alıcı'nın
          Platform'dan yapılan duyurularda belirtilen adedin üzerinde
          Ürün/Hizmet sipariş etmek istemesi halinde sipariş vermesi
          engellenebilecek, siparişi verdikten sonra belirtilen adedin üstünde
          sipariş verdiğinin tespit edilmesi halinde ise belirtilen adedin
          üstündeki siparişleri iptal edilebilecek ve bu halde varsa iptal
          edilen siparişlere ilişkin teslimat masrafları da dâhil olmak üzere
          tahsil edilen tüm ödemeler yasal süresi içerisinde Alıcı'ya iade
          edilecektir. Alıcı işbu hususları kabul ederek siparişini
          oluşturduğunu, adet sınırlamasını geçen siparişlerinin
          engellenebileceği ve iptal edilebileceğini kabul, beyan ve taahhüt
          eder.
        </p>
        <p>
          5.18. Satıcı'nın herhangi bir sebeple tedarik edemediği siparişler,
          Alıcı'nın onayının alınması halinde, mevzuattaki yasal teslim süresini
          aşmamak ve Alıcı'nın Ürün/Hizmet ile aynı özellikleri haiz olmak
          kaydıyla, bir başka satıcıya aktarılabilecektir. Böyle bir durumda
          Ürün/Hizmet yeni satıcı tarafından Alıcı'ya gönderilecek olup Sözleşme
          yeni satıcı ile Alıcı arasında kurulmuş olacaktır. Bu halde, Alıcı'ya
          herhangi bir ek bedel, ücret ve/veya masraf yansıtılmayacaktır.
        </p>
        <p>
          5.19. Alıcı tüketici sıfatıyla talep, şikayet ve önerilerini yukarıda
          yer alan Satıcı iletişim bilgilerini kullanmak suretiyle ve/veya
          Platform'un sağladığı kanallarla ulaştırabilecektir.
        </p>
        <h2>6. ÖZEL ŞARTLAR</h2>
        <p>
          6.1. Alıcı, aksi belirtilmedikçe, Platform'da birden fazla butikten
          tek bir sepette alışveriş yapabilecektir. Aynı sepet içerisinde farklı
          butikten alınan her bir Ürün/Hizmet için Satıcı tarafından birden
          fazla fatura kesilebilecektir. Şüpheye mahal bırakmamak bakımından
          belirtilmelidir ki, Satıcı, Alıcı'nın farklı butiklerden aldığı
          Ürün/Hizmet'in teslimatını mevzuattaki yasal süre içerisinde kalmak
          koşuluyla farklı zamanlarda gerçekleştirebilecektir.
        </p>
        <p>
          6.2. Alıcı'nın vereceği siparişlerde kurumsal fatura seçeneğini
          seçmesi durumunda Satıcı, Alıcı tarafından Platform üzerinden
          bildirilecek vergi kimlik numarası ve vergi dairesi bilgilerini
          kullanarak kurumsal fatura düzenleyecektir. Faturada yer alması
          gereken bilgilerin doğru, güncel ve eksiksiz girilmesi tamamen
          Alıcı'nın sorumluluğunda olup, bu sebeple doğabilecek tüm zararlardan
          bizzat Alıcı sorumludur.
        </p>
        <p>
          6.3. Platform üzerinden kredi kart ile ödeme yapılması halinde, Banka
          tarafından kampanyalar düzenlenerek Alıcı tarafından seçilen taksit
          adedinin daha üstünde bir taksit adedi uygulanabilecek veya taksit
          erteleme gibi ek hizmetler sunulabilecektir. Bu tür kampanyalar
          Banka'nın inisiyatifindedir. Alıcı'nın kredi kartının hesap kesim
          tarihinden itibaren sipariş toplamı taksit adedine bölünerek kredi
          kartı özetine Banka tarafından yansıtılacaktır. Banka taksit
          tutarlarını küsurat farklarını dikkate alarak aylara eşit olarak
          dağıtmayabilir. Detaylı ödeme planlarının oluşturulması Banka'nın
          inisiyatifindedir.
        </p>
        <p>
          6.4. Dijital ürünler fiziki gönderime uygun olmayıp, teslimat ürün
          niteliğine göre şartlarında belirtilen şekilde gerçekleştirilecektir.
          Sözleşme'nin yer alıp da teslimat şekilleri vb. gibi fiziki ürünler
          için geçerli olan düzenlemeler dijital ürünlere uygulanmayacak olup bu
          maddelerdeki düzenlemeler uygulanabilir olduğu ölçüde ürün şartlarında
          belirtilen koşul ve açıklamalara uygun olacak şeklinde
          yorumlanmalıdır.
        </p>
        <p>
          6.5.Sipariş verilen Ürün'ün elektrikli motosiklet olması halinde
          kurulumu gerçekleştikten veya tescil işlemi yapılıp ruhsatlandıktan
          sonra Platform üzerinden iadesi mümkün olmamaktadır.
        </p>
        <p>
          6.6. Platformda satışa sunulan Ürün/Hizmetler yalnızca Satıcı
          tarafından belirlenen sınırlı lokasyonlara (il/ilçe/bölge) teslim
          edilmek üzere satışa sunulabilecek olup, sipariş sürecinde Alıcı'nın
          bu ürün/hizmetler için teslimat adresini Satıcı tarafından belirlenmiş
          olan lokasyonlardan biri dışında seçmesi halinde ilgili sipariş
          verilemeyecek/satın alım gerçekleşmeyecektir.
        </p>
        <p>
          6.7.Türkiye Cumhuriyeti resmi kamu kurum ve kuruluşları ile koordineli
          yürütülen "Depreme Yardım Seferberliği" ve benzeri seferberlik ve
          yardım işlemleriyle bağlantılı siparişlerde (ö: koli yardımı, vb.),
          Mesafeli Sözleşmeler Yönetmeliği'nin 15/1-h maddesi gereği cayma hakkı
          kullanılamayacaktır.
        </p>
        <h2>7. KİŞİSEL VERİLERİN KORUNMASI VE FİKRİ-SINAİ HAKLAR</h2>
        <p>
          7.1. Satıcı, işbu sözleşme kapsamındaki kişisel verileri sadece
          Ürün/Hizmet'in sunulması amacıyla sınırlı olarak ve 6698 sayılı
          Kişisel Verilerin Korunması Kanunu'na, ("KVKK") ikincil mevzuata ve
          Kişisel Verileri Koruma Kurulu kararlarına uygun olarak işleyecektir.
          Satıcı, Platform üzerinden eriştiği kişisel veriler haricinde
          Alıcı'nın kişisel verilerini işlemeyeceğini ve Platform üzerinden
          sağlanan yöntemler dışında Alıcı ile harici olarak iletişime
          geçmeyeceğini kabul, beyan ve taahhüt eder.
        </p>
        <p>
          7.2. Alıcı, işbu Sözleşme kapsamında sağladığı kişisel verilerin
          doğru, eksiksiz ve güncel olduğunu kontrol etmekle, bu bilgileri
          üçüncü kişilerle paylaşmamak, ilgisiz kişilerce erişilememesi için
          virüs ve benzeri zararlı uygulamalara ilişkin olanlar dahil gerekli
          tedbirleri almak ve söz konusu kişisel verilerin güvenliğini
          sağlamakla yükümlü olduğunu, aksi halde doğacak zararlardan ve üçüncü
          kişilerden gelen taleplerden bizzat sorumlu olduğunu kabul, beyan ve
          taahhüt eder.
        </p>
        <p>
          7.3. Platform'a ait her türlü bilgi ve içerik ile bunların
          düzenlenmesi, revizyonu ve kısmen/tamamen kullanımı konusunda;
          Satıcı'nın anlaşmasına göre diğer üçüncü şahıslara ait olanlar hariç;
          tüm fikri-sınai haklar ve mülkiyet hakları Bonnmarşe'ye aittir.
        </p>
        <h2>8. CAYMA HAKKI</h2>
        <p>
          8.1. Alıcı, 15 (onbeş) gün içinde herhangi bir gerekçe göstermeksizin
          ve cezai şart ödemeksizin Sözleşme'den cayma hakkına sahiptir.
        </p>
        <p>
          8.2. Cayma hakkı süresi, Hizmet için Sözleşme'nin kurulduğu gün; Ürün
          için Alıcı'nın veya Alıcı tarafından belirlenen üçüncü kişinin Ürün'ü
          teslim aldığı gün başlar. Ancak Alıcı, Sözleşme'nin kurulmasından Ürün
          teslimine kadar olan süre içinde de cayma hakkını kullanabilir.
        </p>
        <p>8.3. Cayma hakkı süresinin belirlenmesinde;</p>
        <ul>
          <li>
            a) Tek sipariş konusu olup ayrı ayrı teslim edilen Ürün'de, Alıcı
            veya Alıcı tarafından belirlenen üçüncü kişinin son Ürün'ü teslim
            aldığı gün,
          </li>
          <li>
            b) Birden fazla parçadan oluşan Ürün'de, Alıcı veya Alıcı tarafından
            belirlenen üçüncü kişinin son parçayı teslim aldığı gün,
          </li>
          <li>
            c) Belirli bir süre boyunca Ürün'ün düzenli tesliminin yapıldığı
            durumlarda, Alıcı veya Alıcı tarafından belirlenen üçüncü kişinin
            ilk Ürün'ü teslim aldığı gün esas alınır.
          </li>
        </ul>
        <p>
          8.4. Ürün teslimi ile Hizmet ifasının birlikte olduğu durumlarda, Ürün
          teslimine ilişkin cayma hakkı hükümleri uygulanır.
        </p>
        <p>8.5. Satıcı;</p>
        <ul>
          <li>
            a) Ürün'ün teslimi veya Hizmet'in ifasından önce Alıcı'nın cayma
            hakkını kullanması durumunda cayma hakkının kullanıldığına ilişkin
            bildirimin kendisine ulaştığı tarihten itibaren,
          </li>
          <li>
            b) Ürün'ün tesliminden sonra Alıcı'nın cayma hakkını kullanması
            durumunda, cayma bildiriminin kendisine ulaştığı tarih itibarıyla
            bedel Satıcı'ya aktarılmamışsa cayma hakkına konu Ürün'ün, iade için
            öngörülen Kargo Şirketi'ne teslim edildiği tarihten veya iade için
            öngörülenin haricinde bir Kargo Şirketi ile iade edilmesi durumunda
            da Satıcı'ya ulaştığı tarihten itibaren,
          </li>
          <li>
            c) Alıcı'nın siparişinin yasal süre içerisinde teslim edilememesi
            nedeniyle Sözleşme'yi fesih hakkını kullanması durumunda fesih
            bildiriminin kendisine ulaştığı tarihten itibaren 15 (onbeş) gün
            içinde, tahsil ettiği Sözleşme konusu bedeli ile teslimat
            masraflarının Alıcı'ya iadesinden sorumludur.
          </li>
        </ul>
        <p>
          8.6. Cayma hakkı bildiriminin ve Sözleşme'ye ilişkin diğer
          bildirimlerin mevzuata uygun ve süresi içerisinde Platform'da
          belirtilen Bonnmarşe'ye ve/veya Satıcı'ya ait iletişim kanallarından
          yapılması şarttır. Cayma bildiriminin yapılacağı iletişim kanallarına
          https://www.bonnmarse.com/iletisim linkinden ulaşılabilmektedir.
        </p>
        <p>8.7. Cayma hakkının kullanılması halinde:</p>
        <ul>
          <li>
            a) Alıcı cayma hakkını kullanmasından itibaren 14 (ondört) gün
            içerisinde Ürün'ü Satıcı'ya Kargo Şirketi'yle geri gönderir.
          </li>
          <li>
            b) Cayma hakkı kapsamında iade edilecek Ürün kutusu, ambalajı, varsa
            standart aksesuarları ve varsa Ürün ile birlikte hediye edilen diğer
            Ürünler'in de eksiksiz ve hasarsız olarak iade edilmesi
            gerekmektedir.
          </li>
        </ul>
        <p>
          8.8. Alıcı cayma süresi içinde Ürün'ü, işleyişine, teknik
          özelliklerine ve kullanım talimatlarına uygun bir şekilde kullandığı
          takdirde meydana gelen değişiklik ve bozulmalardan sorumlu değildir.
        </p>
        <p>
          8.9. Cayma hakkının kullanılmasını takip eden 14 (ondört) gün
          içerisinde Sözleşme konusu bedeller Alıcı'ya Alıcı'nın ödeme yöntemi
          ile iade edilmektedir. Ürün/Hizmet, Satıcı'ya iade edilirken,
          Ürün/Hizmet'in teslimi sırasında Alıcı'ya ibraz edilmiş olan orijinal
          faturanın da Alıcı tarafından iade edilmesi gerekmektedir. Alıcı'nın
          kurumsal fatura istemesi halinde ilgili Ürün/Hizmet iadesi için iade
          faturası kesmesi veya mümkünse süresi içerisinde ticari faturayı kendi
          sistemlerinden reddetmesi gerekmektedir.
        </p>
        <p>
          8.10. Alıcı iade edeceği Ürün/Hizmet'i Ön Bilgilendirme Formu'nda
          belirtilen Satıcı'nın Kargo Şirketi ile Satıcı'ya gönderdiği sürece
          iade kargo bedeli Satıcı'ya aittir. İade için Alıcı'nın bulunduğu
          yerde Satıcı'nın Kargo Şirketi şubesi bulunmaması halinde, Alıcı
          Ürün'ü herhangi bir Kargo Şirketi'yle gönderebilecektir. Bu halde iade
          kargo bedeli ve Ürün'ün kargo sürecinde uğrayacağı hasardan Satıcı
          sorumludur.
        </p>
        <p>
          8.11. Alıcı cayma hakkını işbu maddede belirtilen süre ve usuller
          dahilinde kullanacak olup aksi halde cayma hakkını kaybedecektir.
        </p>
        <h2>9. CAYMA HAKKININ KULLANILAMAYACAĞI HALLER</h2>
        <p>9.1. Alıcı aşağıdaki sözleşmelerde cayma hakkını kullanamaz:</p>
        <ul>
          <li>
            a) Fiyatı finansal piyasalardaki dalgalanmalara bağlı olarak değişen
            ve Satıcı veya Bonnmarşe'nin kontrolünde olmayan mal veya hizmetlere
            ilişkin sözleşmeler,
          </li>
          <li>
            b) Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda
            hazırlanan mallara ilişkin sözleşmeler,
          </li>
          <li>
            c) Çabuk bozulabilen veya son kullanma tarihi geçebilecek malların
            teslimine ilişkin sözleşmeler,
          </li>
          <li>
            d) Tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu
            unsurları açılmış olan mallardan; iadesi sağlık ve hijyen açısından
            uygun olmayanların teslimine ilişkin sözleşmeler,
          </li>
          <li>
            e) Tesliminden sonra başka ürünlerle karışan ve doğası gereği
            ayrıştırılması mümkün olmayan mallara ilişkin sözleşmeler,
          </li>
          <li>
            f)Ürünün tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu
            unsurları açılmış olması halinde maddi ortamda sunulan kitap,
            dijital içerik ve bilgisayar sarf malzemelerine ilişkin sözleşmeler,
          </li>
          <li>
            g)Abonelik sözleşmesi kapsamında sağlananlar dışında gazete ve dergi
            gibi süreli yayınların teslimine ilişkin sözleşmeler,
          </li>
          <li>
            h)Belirli bir tarihte veya dönemde yapılması gereken, konaklama,
            eşya taşıma, araba kiralama, yiyecek içecek tedariki ve eğlence veya
            dinlenme amacıyla yapılan boş zamanın değerlendirilmesine ilişkin
            sözleşmeler,
          </li>
          <li>
            i) Elektronik ortamda anında ifa edilen hizmetler ile Alıcı'ya
            anında teslim edilen gayri maddi mallara ilişkin sözleşmeler,
          </li>
          <li>
            j) Cayma hakkı süresi sona ermeden önce, Alıcı'nın onayı ile ifasına
            başlanan hizmetlere ilişkin sözleşmeler, cayma hakkı
            kullanılamayacak; bu siparişler bakımından Platform üzerinden iade
            kodu da oluşturulamayacaktır.
          </li>
        </ul>
        <p>
          9.2. Ürün/Hizmet'in Yönetmelik'in uygulama alanı dışında bırakılmış
          olan (Sözleşme'nin 3.3. maddesinde listelenmiştir) Ürün/Hizmet
          türlerinden müteşekkil olması halinde Alıcı ve Satıcı arasındaki
          hukuki ilişkiye Yönetmelik hükümleri uygulanamaması sebebiyle cayma
          hakkı kullanılamayacak; bu siparişler bakımından Platform üzerinden
          iade kodu da oluşturulamayacaktır.
        </p>
        <p>
          9.3. Platform üzerinden elektronik kod satın alındığı durumlarda bahse
          konu siparişlerde Yönetmelik gereği cayma hakkı söz konusu
          olmayacaktır. Bu siparişler bakımından Platform üzerinden iade kodu da
          oluşturulamayacaktır.
        </p>
        <h2>10. UYUŞMAZLIKLARIN ÇÖZÜMÜ</h2>
        <p>
          10.1Sözleşme'nin uygulanmasında, Bakanlık'ça ilan edilen değerlere
          uygun olarak Alıcı'nın Ürün/Hizmet'i satın aldığı ve ikametgahının
          bulunduğu yerdeki Tüketici Hakem Heyetleri ile Tüketici Mahkemeleri
          yetkilidir.
        </p>
      </div>
      <div
        className={clsx(
          "max-h-60 w-full overflow-y-auto rounded-md bg-stone-50 px-12 py-4 shadow-inner",
          "[&>p]:text-xs",
          "[&>h2]:text-base",
          "[&>h1]:text-lg",
          "[&>*]:my-2",
          "[&>table]:w-full",
          "[&>table>tbody>tr>td]:border [&>table>tbody>tr>td]:px-2 [&>table>tbody>tr>td]:py-2 [&>table>tbody>tr>td]:text-left [&>table>tbody>tr>td]:text-xs [&>table>tbody>tr>td]:font-semibold",
          "[&>table>thead>tr>th]:border [&>table>thead>tr>th]:px-2 [&>table>thead>tr>th]:py-2 [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:text-xs [&>table>thead>tr>th]:font-semibold",
          "[&>li]:py-2 [&>ul]:text-xs",
        )}
      >
        <h1>Mesafeli Satış Sözleşmesi</h1>
        <h2>1. Taraflar</h2>
        <p>
          İşbu Mesafeli Satış Sözleşmesi ("Sözleşme"), Alıcı ve Satıcı arasında
          aşağıda belirtilen hüküm ve şartlar çerçevesinde elektronik ortamda
          kurulmuştur. Alıcı ve Satıcı, Sözleşme kapsamında birlikte "Taraflar",
          ayrı ayrı "Taraf" olarak anılacaktır.
        </p>
        <h2>2. TANIMLAR</h2>
        <p>
          Sözleşme'nin uygulanmasında ve yorumlanmasında aşağıda yazılı terimler
          karşılarındaki yazılı açıklamaları ifade edeceklerdir.
        </p>
        <table>
          <tbody>
            <tr>
              <td>Alıcı</td>
              <td>
                Bir Mal veya Hizmet'i ticari veya mesleki olmayan amaçlarla
                edinen, kullanan veya yararlanan gerçek kişiyi,
              </td>
            </tr>
            <tr>
              <td>Bakanlık</td>
              <td>Türkiye Cumhuriyeti Ticaret Bakanlığı'nı,</td>
            </tr>
            <tr>
              <td>Banka</td>
              <td>
                5411 sayılı Bankacılık Kanunu uyarınca kurulan lisanslı
                kuruluşları,
              </td>
            </tr>
            <tr>
              <td>Bonnmarşe veya Elektronik Ticaret Aracı Hizmet Sağlayıcı </td>
              <td>
                Oluşturduğu sistem ile Satıcı'nın Ürün/Hizmet'i satışa sunduğu
                Platform'u işleten ve Satıcı adına mesafeli sözleşme kurulmasına
                aracılık eden Bonnmarşe Şirketi'ni,
              </td>
            </tr>
            <tr>
              <td>Hizmet</td>
              <td>
                Bir ücret veya menfaat karşılığında yapılan ya da yapılması
                taahhüt edilen Ürün sağlama dışındaki her türlü tüketici
                işleminin konusunu,
              </td>
            </tr>
            <tr>
              <td>Kanun</td>
              <td>6502 sayılı Tüketicinin Korunması Hakkında Kanun'u,</td>
            </tr>
            <tr>
              <td>Kargo Şirket</td>
              <td>
                Ürün'ün Alıcı'ya ulaştırılmasını, iade süreçlerinde Alıcı'dan
                alınarak Satıcı veya Bonnmarşe'ye ulaştırılmasını sağlayan
                anlaşmalı kargo veya lojistik şirketini,
              </td>
            </tr>
            <tr>
              <td>Ön Bilgilendirme Formu</td>
              <td>
                Sözleşme kurulmadan ya da buna karşılık herhangi bir teklif
                Alıcı tarafından kabul edilmeden önce Alıcı'yı Yönetmelik'te
                belirtilen asgari hususlar konusunda bilgilendirmek için
                hazırlanan formu,
              </td>
            </tr>
            <tr>
              <td>Platform</td>
              <td>
                Bonnmarşe'ye ait www.bonnmarse.com adlı internet sitesini ve
                mobil uygulamasını,
              </td>
            </tr>
            <tr>
              <td>Satıcı</td>
              <td>
                Kamu tüzel kişileri de dahil olmak üzere ticari veya mesleki
                amaçlarla tüketiciye Ürün/Hizmet sunan ya da Ürün/Hizmet sunanın
                adına ya da hesabına hareket eden ve Sözleşme'nin 5. maddesinde
                bilgileri bulunan gerçek ve/veya tüzel kişiyi,
              </td>
            </tr>
            <tr>
              <td>Sözleşme</td>
              <td>Satıcı ve Alıcı arasında akdedilen Sözleşme'yi,</td>
            </tr>
            <tr>
              <td>Ürün</td>
              <td>
                Alışverişe konu olan taşınır eşya, konut veya tatil amaçlı
                taşınmaz mallar ile elektronik ortamda kullanılmak üzere
                hazırlanan yazılım, ses, görüntü ve benzeri her türlü gayri
                maddi malı,
              </td>
            </tr>
            <tr>
              <td>Yönetmelik</td>
              <td>Mesafeli Sözleşmeler Yönetmeliği'ni ifade eder.</td>
            </tr>
          </tbody>
        </table>
        <h2>3. SÖZLEŞMENİN KONUSU ve KAPSAMI</h2>
        <p>
          3.1. Sözleşme'nin konusu Alıcı'nın, Platform'da, Ürün/Hizmet'in satın
          alınmasına yönelik elektronik olarak sipariş verdiği, Sözleşme'de
          belirtilen niteliklere sahip Ürün/Hizmet'in satışı ve teslimi ile
          ilgili olarak Kanun ve Yönetmelik hükümleri gereğince Taraflar'ın hak
          ve yükümlülüklerinin belirlenmesi olup Taraflar, Sözleşme tahtında
          Kanun ve Yönetmelik'ten kaynaklanan yükümlülük ve sorumluluklarını
          bildiklerini ve anladıklarını kabul, beyan ve taahhüt ederler.
        </p>
        <p>
          3.2. Sözleşme'nin akdedilmesi Taraflar'ın ayrı ayrı Bonnmarşe ile
          akdetmiş oldukları sözleşmelerin hükümlerinin ifasını engellemeyecek
          olup, Taraflar, Bonnmarşe'nin Ürün/Hizmet'in satışına ve Sözleşme'ye
          herhangi bir şekilde taraf olmadığını ve Sözleşme kapsamında
          Taraflar'ın yükümlülüklerini yerine getirmeleri ile ilgili Kanun ve
          Yönetmelik çerçevesinde kendisine yüklenmiş olanlar hariç olmak üzere
          herhangi bir sorumluluğu ve taahhüdü bulunmadığını kabul, beyan ve
          taahhüt ederler.
        </p>
        <p>
          3.3. Mevzuat uyarınca aşağıdaki Ürün/Hizmet satışları Sözleşme'nin
          kapsamında değildir.
        </p>
        <ul>
          <li>Finansal hizmetler,</li>
          <li>Otomatik makineler aracılığıyla yapılan satışlar,</li>
          <li>
            Halka açık telefon vasıtasıyla telekomünikasyon operatörleriyle bu
            telefonun kullanımı,
          </li>
          <li>
            Bahis, çekiliş, piyango ve benzeri şans oyunlarına ilişkin
            hizmetler,
          </li>
          <li>
            Taşınmaz malların veya bu mallara ilişkin hakların oluşumu, devri
            veya kazanımı,
          </li>
          <li>Konut kiralama,</li>
          <li>Paket turlar,</li>
          <li>
            Devre mülk, devre tatil, uzun süreli tatil hizmeti ve bunların
            yeniden satımı veya değişimi,
          </li>
          <li>
            Yiyecek ve içecekler gibi günlük tüketim maddelerinin, satıcının
            düzenli teslimatları çerçevesinde tüketicinin meskenine veya
            işyerine götürülmesi,
          </li>
          <li>Yolcu taşıma hizmetleri,</li>
          <li>Ürünlerin montaj, bakım ve onarımı,</li>
          <li>
            Bakımevi hizmetleri, çocuk, yaşlı ya da hasta bakımı gibi ailelerin
            ve kişilerin desteklenmesine yönelik sosyal hizmetler.
          </li>
          <li>
            Kısa mesaj aracılığıyla kurulan ve eş zamanlı olarak tamamen ifa
            edilen abonelik içermeyen katma değerli elektronik haberleşme
            Hizmetleri ile 23/6/1983 tarihli ve 2860 sayılı Yardım Toplama
            Kanunu kapsamındaki bağışlar ve kamu kurumlarınca sunulan katma
            değerli elektronik haberleşme hizmetleri.
          </li>
        </ul>
        <h2>4. ALICI'NIN ÖNCEDEN BİLGİLENDİRİLDİĞİ HUSUSLAR</h2>
        <p>
          Alıcı, siparişin oluşturması ve Sözleşme'nin kurulmasından önce, gerek
          Platform'un ilgili sayfaları ve kısımlarındaki tüm genel-özel
          açıklamalar, gerek Sözleşme, gerek Ön Bilgilendirme Formu gerekse de
          sair şekillerde, aşağıda yer verilenler de dahil olmak üzere
          Sözleşme'nin akdi ve uygulaması ile ilgili tüm hususlar hakkında doğru
          ve eksiksiz olarak bilgilendirildiğini ve bunları okuyup anladığını
          kabul, beyan ve taahhüt eder.
        </p>
        <ul>
          <li>Ürün/Hizmet'in temel nitelikleri,</li>
          <li>
            Satıcı'nın adı veya unvanı, MERSİS numarası veya vergi kimlik
            numarası ve iletişim bilgileri ile diğer tanıtıcı bilgileri,
          </li>
          <li>
            Ürün/Hizmet'in Platform'dan alınması sırasındaki satış işlemi
            aşamaları ile yanlış girilen bilgilerin düzeltilmesine ilişkin amaca
            uygun araçlar-yöntemler,
          </li>
          <li>
            Satıcı'nın mensubu olduğu Meslek Odası (İTO-İstanbul Ticaret Odası)
            ve İTO'nun meslek ile ilgili öngördüğü davranış kuralları bilgisinin
            edinebileceği elektronik iletişim bilgileri (Telefon: 444 0 486,
            www.ito.org.tr)
          </li>
          <li>
            Bonnmarşe tarafından uygulanan Alıcı bilgileri için geçerli
            gizlilik, veri kullanımı-işleme ve elektronik iletişim kuralları ile
            Alıcı'nın bu hususlarda Bonnmarşe'ye verdiği izinlerin kapsamı,
            Alıcı'nın kanuni hakları, Satıcı'nın hakları ve Taraflar'ın
            haklarını kullanım usulleri,
          </li>
          <li>
            Ürün/Hizmet için Satıcı tarafından öngörülen gönderim kısıtlamaları,
          </li>
          <li>
            Ürün/Hizmet için kabul edilen ödeme yöntem-araçları, Ürün/Hizmet'in
            vergiler dahil toplam satış fiyatı,
          </li>
          <li>
            Ürün/Hizmet'in Alıcı'ya teslimine ilişkin usuller ile
            nakliye-teslimat-kargo masrafları gibi ek masraflar hakkında
            bilgiler,
          </li>
          <li>
            Ürün/Hizmet'in Alıcı'ya teslimine ilişkin usuller ile
            nakliye-teslimat -kargo masrafları gibi ek masraflar hakkında
            bilgiler,
          </li>
          <li>
            Ürün/Hizmet ile ilgili diğer ödeme/tahsilat ve teslimat bilgileri ve
            süresi ile Sözleşme'nin ifasına ilişkin diğer bilgiler ve
            Taraflar'ın bu hususlardaki sorumlulukları,
          </li>
          <li>
            Alıcı'nın cayma hakkını kullanamadığı durumlarda bu haktan
            faydalanamayacağına veya hakkın süresinde kullanılmaması da dahil
            olmak üzere hangi koşullarda bu hakkı kaybedeceğine ilişkin bilgi,
          </li>
          <li>
            Alıcı'nın cayma hakkının olduğu durumlarda bu hakkını kullanma
            şartları, süresi ve usulü, Satıcı'nın iade için öngördüğü Kargo
            Şirketi'ne ilişkin bilgi ve tüm mali hususlar (iade yöntemi ile
            masrafı, Sözleşme konusu bedelin iadesi ve iade sırasında Alıcı
            tarafından kazanılmış/kullanılmış ödül puanları sebebiyle
            yapılabilecek indirim ve mahsuplar dahil),
          </li>
          <li>
            Cayma bildiriminin yapılacağı açık adres, faks numarası veya
            elektronik posta bilgileri,
          </li>
          <li>
            Satıcı'nın talebi üzerine, varsa tüketici tarafından ödenmesi veya
            sağlanması gereken depozitolar ya da diğer mali teminatlar ve
            bunlara ilişkin şartlar,
          </li>
          <li>
            Varsa dijital içeriklerin işlevselliğini etkileyebilecek teknik
            koruma önlemleri,
          </li>
          <li>
            Alıcı'nın Platform'da dönem dönem uygulanabilecek çeşitli fırsatlara
            ilişkin yararlanma koşullarının (özel şartlar) detayları,
          </li>
          <li>
            Satıcı'nın bildiği ya da makul olarak bilmesinin beklendiği, dijital
            içeriğin hangi donanım ya da yazılımla birlikte çalışabileceğine
            ilişkin bilgi,
          </li>
          <li>
            Mahiyetine göre Sözleşme'de yer alan diğer tüm satış şartları ile
            Sözleşme Alıcı tarafından Platform'da onaylanarak kurulduktan sonra
            Sözleşme'nin Alıcı'nın talebi halinde Alıcı'ya elektronik posta ile
            gönderileceği ve Alıcı tarafından Sözleşme'ye üyelik hesabından
            erişilebileceğine ilişkin bilgi,
          </li>
          <li>
            Uyuşmazlık hallerinde Alıcı'nın, başvurularını Tüketici Mahkemesine
            veya Tüketici Hakem Heyetine yapabileceğine ilişkin bilgi.
          </li>
        </ul>
        <h2>
          5. ALICI, SATICI, ELEKTRONİK TİCARET ARACI HİZMET SAĞLAYICI VE FATURA
          BİLGİLERİ
        </h2>
        <h2>ALICI BİLGİLERİ</h2>
        <table>
          <tbody>
            <tr>
              <td>Teslim Edilecek Kişi</td>
              <td>{aliciAdi}</td>
            </tr>
            <tr>
              <td>Teslimat Adresi</td>
              <td>{teslimatAdresi}</td>
            </tr>
            <tr>
              <td>Telefon</td>
              <td>{telefon}</td>
            </tr>
            <tr>
              <td>Faks</td>
              <td></td>
            </tr>
            <tr>
              <td>E-posta/Kullanıcı Adı</td>
              <td>{email}</td>
            </tr>
          </tbody>
        </table>
        <h2>SATICI BİLGİLERİ</h2>
        <table>
          <tbody>
            <tr>
              <td>Satıcının Ticaret Unvanı / Adı ve Soyadı </td>
              <td>{saticiAdi}</td>
            </tr>
            <tr>
              <td>Satıcının Adresi </td>
              <td>{saticiAdresi}</td>
            </tr>
            <tr>
              <td>Satıcının Mersis Numarası</td>
              <td></td>
            </tr>
            <tr>
              <td>Satıcının Vergi Kimlik Numarası </td>
              <td></td>
            </tr>
            <tr>
              <td>Satıcının Telefonu </td>
              <td>{saticiTelefonu}</td>
            </tr>
            <tr>
              <td>Satıcının Faks Numarası</td>
              <td>{saticiFaks}</td>
            </tr>
            <tr>
              <td>Satıcı KEP ve E-posta Bilgileri </td>
              <td>{saticiEmail}</td>
            </tr>
          </tbody>
        </table>
        <h2>ELEKTRONİK TİCARET ARACI HİZMET SAĞLAYICI BİLGİLERİ</h2>
        <table>
          <tbody>
            <tr>
              <td>Elektronik Ticaret Aracı Hizmet Sağlayıcı Unvanı </td>
              <td>Bonnmarşe</td>
            </tr>
            <tr>
              <td>Elektronik Ticaret Aracı Hizmet Sağlayıcı Adresi</td>
              <td>Yıldıztepe mah. 162.cadde 21/A Ankara</td>
            </tr>
            <tr>
              <td>
                Elektronik Ticaret Aracı Hizmet Sağlayıcı Mersis Numarası{" "}
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                Elektronik Ticaret Aracı Hizmet Sağlayıcı Vergi Kimlik Numarası{" "}
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Elektronik Ticaret Aracı Hizmet Sağlayıcı Telefonu </td>
              <td></td>
            </tr>
            <tr>
              <td>Elektronik Ticaret Aracı Hizmet Sağlayıcı Faks Numarası </td>
              <td></td>
            </tr>
            <tr>
              <td>
                Elektronik Ticaret Aracı Hizmet Sağlayıcı Şikâyet/Öneri
                Kanalları{" "}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <h2>FATURA BİLGİLERİ</h2>
        <table>
          <tbody>
            <tr>
              <td>Ticari Unvanı / Adı ve Soyadı</td>
              <td>{aliciAdi}</td>
            </tr>
            <tr>
              <td>Vergi Dairesi ve Vergi Kimlik Numarası </td>
              <td></td>
            </tr>
            <tr>
              <td>Fatura Adresi</td>
              <td>{teslimatAdresi}</td>
            </tr>
            <tr>
              <td>Fatura Vergi Kimlik Numarası</td>
              <td></td>
            </tr>
            <tr>
              <td>Adres</td>
              <td>{teslimatAdresi}</td>
            </tr>
            <tr>
              <td>Telefon</td>
              <td>{telefon}</td>
            </tr>
            <tr>
              <td>Faks</td>
              <td></td>
            </tr>
            <tr>
              <td>E-posta/Kullanıcı Adı </td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>Fatura Teslim </td>
              <td>
                Fatura sipariş teslimatı sırasında teslimat adresine sipariş ile
                birlikte ve/veya e-fatura yöntemiyle elektronik posta adresine
                teslim edilecektir.
              </td>
            </tr>
          </tbody>
        </table>
        <h2>6. ÜRÜN/HİZMET BİLGİLERİ</h2>
        <p>
          6.1. Ürün/Hizmet'in temel özellikleri (türü, miktarı, marka/modeli,
          rengi, adedi, fiyatı) Platform'da yer almakta olup Platform üzerinden
          detaylı şekilde incelenebilecektir.
        </p>
        <p>
          6.2.Ürün/Hizmet karşılığında ödenecek tüm tutarlar (tüm vergiler dahil
          satış fiyatı, kargo bedeli, taksit farkı tutarı, açık pazar ve/veya
          diğer butiklerinden eş zamanlı olarak gerçekleştirilen alışverişlerde
          hak kazanılan toplam indirim tutarı vb.) aşağıdaki tabloda
          gösterilmiştir.
        </p>
        <table>
          <thead>
            <tr>
              <th>Ürün/Hizmet Açıklaması </th>
              <th>Adet</th>
              <th>Peşin Fiyatı</th>
              <th>Ara Toplam (KDV Dahil)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{urun}</td>
              <td>{urunAdet}</td>
              <td>{urunFiyati} TL</td>
              <td>{toplamFiyat} TL</td>
            </tr>
            <tr>
              <td>Kargo Tutarı</td>
              <td></td>
              <td></td>
              <td>{kargoTutari} TL</td>
            </tr>
            <tr>
              <td>Toplam</td>
              <td></td>
              <td></td>
              <td>{toplamFiyat} TL</td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto">
          <tbody>
            <tr>
              <td>Ürün/Hizmet Açıklaması:</td>
              <td>{urun}</td>
            </tr>
            <tr>
              <td>Adet:</td>
              <td>{urunAdet}</td>
            </tr>
            <tr>
              <td>Peşin Fiyatı:</td>
              <td>{urunFiyati} TL</td>
            </tr>
            <tr>
              <td>Kargo Tutarı:</td>
              <td>{kargoTutari} TL</td>
            </tr>
            <tr>
              <td>Toplam:</td>
              <td>{toplamFiyat} TL</td>
            </tr>
            <tr>
              <td>Sipariş Tarihi:</td>
              <td>{siparisTarihi}</td>
            </tr>
            <tr>
              <td>Teslimat Süresi:</td>
              <td>{teslimatSuresi}</td>
            </tr>
            <tr>
              <td>Kargo Şirketi'ne Teslim Süresi:</td>
              <td>{kargoTeslimSuresi}</td>
            </tr>
          </tbody>
        </table>
        <p>
          *Sözleşme ve ilgili mevzuat hükümlerinde yer alan istisnalar saklıdır.
        </p>
        <p>
          **Belirtilen süre teslimatın taahhüdü değildir, satıcı tarafından
          kargo şirketine teslim edilme süresini ifade eder.
        </p>
        <h2>7. GENEL HÜKÜMLER</h2>
        <p>
          7.1. Satıcı, Ürün/Hizmet'i eksiksiz, siparişte belirtilen niteliklere
          uygun ve varsa garanti belgeleri, kullanım kılavuzları ile mevzuat
          gereği Ürün/Hizmet'le birlikte teslim etmesi gereken sair bilgi ve
          belgeler ile teslim etmeyi kabul, beyan ve taahhüt eder.
        </p>
        <p>
          7.2. Ürün, Alıcı veya Alıcı tarafından belirlenen üçüncü kişiye,
          taahhüt edilen teslim süresi içerisinde ve her halükârda 30 (otuz)
          günlük yasal süreyi aşmamak koşulu ile, Alıcı'nın Platform'da
          belirtmiş olduğu teslimat adresine Kargo Şirketi tarafından teslim
          edilir. Bu süre içerisinde Satıcı'nın edimini yerine getirmemesi
          durumunda Alıcı Sözleşme'yi feshedebilecektir. Ancak Alıcı'nın isteği
          veya kişisel ihtiyaçları doğrultusunda hazırlanan Ürün/Hizmet
          satışlarında teslim süresi ilgili 30 (otuz) günü aşabilecektir.
          Ayrıca, sipariş durumu "Ön Sipariş" veya "Sipariş Üzerine Üretim"
          olarak belirtilen Ürün/Hizmet için teslimat süresi de 30 (otuz) günü
          aşabilecek olup Alıcı, Alıcı'nın isteği veya kişisel ihtiyaçları
          doğrultusunda hazırlanan "Sipariş Üzerine Üretim" ya da "Ön Sipariş"
          statüsünde olan bir Ürün/Hizmet satın aldığında teslimatın 30 (otuz)
          gün içerisinde yapılmaması dolayısıyla Sözleşme'yi feshedemeyecektir.
        </p>
        <p>
          7.3. Satıcı Ürün'ü Kargo Şirketi aracılığı ile Alıcı'ya göndermekte ve
          teslim ettirmektedir. Kargo Şirketi'nin Alıcı'nın bulunduğu yerde
          şubesi olmaması halinde Alıcı'nın Ürün'ü Kargo Şirketi'nin Satıcı
          tarafından bildirilen yakın bir diğer şubesinden teslim alması
          gerekmektedir.
        </p>
        <p>
          7.4. Alıcı veya Alıcı tarafından belirlenen üçüncü kişinin teslim
          anında adreste bulunmaması durumunda Alıcı'nın Ürün/Hizmet'i geç
          teslim almasından ve/veya hiç teslim almamasından kaynaklanan
          zararlardan ve giderlerden Satıcı sorumlu değildir.
        </p>
        <p>
          7.5. Ürün/Hizmet'in teslimat masrafları aksine bir hüküm yoksa
          Alıcı'ya aittir. Satıcı, Platform'da teslimat ücretinin kendisince
          karşılanacağını beyan etmişse teslimat masrafları Satıcı'ya ait
          olacaktır.
        </p>
        <p>
          7.6. Satıcı, Sözleşme'den doğan ifa yükümlülüğünün süresi dolmadan
          Alıcı'yı Platform üzerinden bilgilendirmek ve açıkça onayını almak
          suretiyle muadil bir Ürün/Hizmet tedarik edebilecektir.
        </p>
        <p>
          7.7. Ürün/Hizmet ediminin yerine getirilmesinin imkansızlaştığı
          hallerde Satıcı'nın bu durumu öğrendiği tarihten itibaren 3 (üç) gün
          içinde Alıcı'ya yazılı olarak veya veri saklayıcısı ile bildirmesi ve
          varsa teslimat masrafları da dâhil olmak üzere tahsil edilen tüm
          ödemeleri bildirim tarihinden itibaren en geç 14 (ondört) gün içinde
          iade etmesi zorunludur. Ürün/Hizmet'in stokta bulunmaması durumu,
          Ürün/Hizmet ediminin yerine getirilmesinin imkânsızlaşması olarak
          kabul edilmez.
        </p>
        <p>
          7.8. Alıcı, Ürün'ü teslim almadan önce muayene edecek; ezik, kırık,
          ambalajı yırtılmış vb. hasarlı, ayıplı veya eksik Ürün/Hizmet'i teslim
          almayacaktır. Teslim alınan Ürün/Hizmet'in hasarsız ve sağlam olduğu
          kabul edilecektir. Teslimden sonra Ürün'ün özenle korunması borcu,
          Alıcı'ya aittir. Cayma hakkı kullanılacaksa Ürün/Hizmet kullanılmamalı
          ve Ürün/Hizmet faturası ve teslim sırasında Alıcı'ya iletilen diğer
          tüm belgeler (örneğin garanti belgesi, kullanım kılavuzu vb.) ile
          birlikte iade edilmesi gerekmektedir.
        </p>
        <p>
          7.9. Alıcı, Sözleşme konusu bedeli ödemekle yükümlü olup, herhangi bir
          nedenle Sözleşme konusu bedelin ödenmemesinin ve/veya Banka
          kayıtlarında iptal edilmesinin Satıcı'nın Ürün/Hizmet'i teslim
          yükümlülüğü ile Sözleşme'den kaynaklanan sair yükümlülüklerinin sona
          ereceğini kabul, beyan ve taahhüt eder. Alıcı, herhangi bir sebeple
          Banka tarafından başarısız kodu gönderilen ancak buna rağmen Banka
          tarafından Satıcı'ya yapılan ödemelere ilişkin olarak, Satıcı'nın
          herhangi bir sorumluluğunun bulunmadığını kabul, beyan ve taahhüt
          eder.
        </p>
        <p>
          7.10. Alıcı, Ürün'ün teslim edilmesinden sonra Alıcı'ya ait kredi
          kartının yetkisiz kişilerce haksız kullanılması sonucunda Sözleşme
          konusu bedelin ilgili Banka tarafından Satıcı'ya ödenmemesi halinde,
          Alıcı Ürün'ü 3 (üç) gün içerisinde iade masrafları Alıcı'ya ait olacak
          şekilde Satıcı'ya iade edeceğini kabul, beyan ve taahhüt eder.
        </p>
        <p>
          7.11. Sözleşme kapsamında herhangi bir nedenle Alıcı'ya bedel iadesi
          yapılması gereken durumlarda, Alıcı, ödemeyi kredi kartı ile yapmış
          olması halinde, Satıcı tarafından kredi kartına iade edilen tutarın
          banka tarafından Alıcı hesabına yansıtılmasına ilişkin ortalama
          sürecin 2 (iki) ile 3 (üç) haftayı bulabileceğini, bu tutarın Satıcı
          tarafından Banka'ya iadesinden sonra Alıcı'nın hesaplarına yansıması
          halinin tamamen Banka işlem süreci ile ilgili olduğunu ve olası
          gecikmelerde Banka'nın sorumlu olduğunu ve bunlar için Bonnmarşe'yi ve
          Satıcı'yı sorumlu tutamayacağını kabul, beyan ve taahhüt eder.
        </p>
        <p>
          7.12. Alıcı ile sipariş esnasında kullanılan kredi kartı hamilinin
          aynı kişi olmaması veya Ürün/Hizmet'in Alıcı'ya tesliminden evvel,
          siparişte kullanılan kredi kartına ilişkin güvenlik açığı tespit
          edilmesi halinde, kredi kartı hamiline ilişkin kimlik ve iletişim
          bilgilerini, siparişte kullanılan kredi kartının bir önceki aya ait
          ekstresini yahut kart hamilinin Banka'dan kredi kartının kendisine ait
          olduğuna ilişkin yazıyı ibraz etmesini Alıcı'dan talep
          edilebilecektir. Alıcı'nın talebe konu bilgi/belgeleri temin etmesine
          kadar geçecek sürede sipariş dondurulacak olup, söz konusu taleplerin
          24 (yirmidört) saat içerisinde karşılanmaması halinde ise Satıcı,
          siparişi iptal etme hakkını haizdir.
        </p>
        <p>
          7.13. Sipariş edilmeyen Ürün/Hizmet'in gönderilmesi durumunda,
          Alıcı'ya karşı herhangi bir hak ileri sürülemez. Bu hallerde,
          Alıcı'nın sessiz kalması ya da söz konusu Ürün/Hizmet'i kullanmış
          olması, sözleşmenin kurulmasına yönelik kabul beyanı olarak
          yorumlanamaz.
        </p>
        <p>
          7.14. Alıcı'nın sipariş edebileceği Ürün/Hizmet adetlerine
          Platform'dan yapılacak duyurularla kısıt getirilebilir. Alıcı'nın
          Platform'dan yapılan duyurularda belirtilen adetin üzerinde
          Ürün/Hizmet sipariş etmek istemesi halinde sipariş vermesi
          engellenebilecek, siparişi verdikten sonra belirtilen adedin üstünde
          sipariş verdiğinin tespit edebilmesi halinde ise belirtilen adedin
          üstündeki siparişleri iptal edilebilecek ve bu halde varsa iptal
          edilen siparişlere ilişkin teslimat masrafları da dâhil olmak üzere
          tahsil edilen tüm ödemeler yasal süresi içerisinde Alıcı'ya iade
          edilecektir. Alıcı işbu hususları kabul ederek siparişini
          oluşturduğunu, adet sınırlamasını geçen siparişlerinin
          engellenebileceği ve iptal edilebileceğini kabul, beyan ve taahhüt
          eder.
        </p>
        <p>
          7.15. Satıcı'nın herhangi bir sebeple tedarik edemediği siparişler,
          Alıcı'nın onayının alınması halinde, mevzuattaki yasal teslim süresini
          aşmamak ve Alıcı'nın Ürün/Hizmet ile aynı özellikleri haiz olmak
          kaydıyla, bir başka satıcıya aktarılabilecektir. Böyle bir durumda
          Ürün/Hizmet yeni satıcı tarafından Alıcı'ya gönderilecek olup Sözleşme
          yeni satıcı ile Alıcı arasında kurulmuş olacaktır. Bu halde, Alıcı'ya
          herhangi bir ek bedel, ücret ve/veya masraf yansıtılmayacaktır.
        </p>
        <h2>8. ÖZEL ŞARTLAR</h2>
        <p>
          8.1. Alıcı, aksi belirtilmedikçe, Platform'da birden fazla butikten
          tek bir sepette alışveriş yapabilecektir. Aynı sepet içerisinde farklı
          butikten alınan her bir Ürün/Hizmet için Satıcı tarafından birden
          fazla fatura kesilebilecektir. Şüpheye mahal bırakmamak bakımından
          belirtilmelidir ki, Satıcı, Alıcı'nın farklı butiklerden aldığı
          Ürün/Hizmet'in teslimatını mevzuattaki yasal süre içerisinde kalmak
          koşuluyla farklı zamanlarda gerçekleştirebilecektir.
        </p>
        <p>
          8.2. Alıcı'nın vereceği siparişlerde kurumsal fatura seçeneğini
          seçmesi durumunda Satıcı, Alıcı tarafından Platform üzerinden
          bildirilecek vergi kimlik numarası ve vergi dairesi bilgilerini
          kullanarak kurumsal fatura düzenleyecektir. Faturada yer alması
          gereken bilgilerin doğru, güncel ve eksiksiz girilmesi tamamen
          Alıcı'nın sorumluluğunda olup, bu sebeple doğabilecek tüm zararlardan
          bizzat Alıcı sorumludur.
        </p>
        <p>
          8.3. Platform üzerinden kredi kart ile ödeme yapılması halinde, Banka
          tarafından kampanyalar düzenlenerek Alıcı tarafından seçilen taksit
          adedinin daha üstünde bir taksit adedi uygulanabilecek veya taksit
          erteleme gibi ek hizmetler sunulabilecektir. Bu tür kampanyalar
          Banka'nın inisiyatifindedir. Alıcı'nın kredi kartının hesap kesim
          tarihinden itibaren sipariş toplamı taksit adedine bölünerek kredi
          kartı özetine Banka tarafından yansıtılacaktır. Banka taksit
          tutarlarını küsurat farklarını dikkate alarak aylara eşit olarak
          dağıtmayabilir. Detaylı ödeme planlarının oluşturulması Banka'nın
          inisiyatifindedir.
        </p>
        <p>
          8.4. Dijital ürünler fiziki gönderime uygun olmayıp, teslimat ürün
          niteliğine göre şartlarında belirtilen şekilde gerçekleştirilecektir.
          Sözleşme'nin yer alıp da teslimat şekilleri vb. gibi fiziki ürünler
          için geçerli olan düzenlemeler dijital ürünlere uygulanmayacak olup bu
          maddelerdeki düzenlemeler uygulanabilir olduğu ölçüde ürün şartlarında
          belirtilen koşul ve açıklamalara uygun olacak şeklinde
          yorumlanmalıdır.
        </p>
        <p>
          8.5. Sipariş verilen Ürün'ün elektrikli motosiklet olması halinde
          kurulumu gerçekleştikten veya tescil işlemi yapılıp ruhsatlandıktan
          sonra Platform üzerinden iadesi mümkün olmamaktadır.
        </p>
        <p>
          8.6. Platformda satışa sunulan Ürün/Hizmetler yalnızca Satıcı
          tarafından belirlenen sınırlı lokasyonlara (il/ilçe/bölge) teslim
          edilmek üzere satışa sunulabilecek olup, sipariş sürecinde Alıcı'nın
          bu ürün/hizmetler için teslimat adresini Satıcı tarafından belirlenmiş
          olan lokasyonlardan biri dışında seçmesi halinde ilgili sipariş
          verilemeyecek/satın alım gerçekleşmeyecektir.
        </p>
        <p>
          8.7. Türkiye Cumhuriyeti resmi kamu kurum ve kuruluşları ile
          koordineli yürütülen "Depreme Yardım Seferberliği" ve benzeri
          seferberlik ve yardım işlemleriyle bağlantılı siparişlerde (ö: koli
          yardımı, vb.), Mesafeli Sözleşmeler Yönetmeliği'nin 15/1-h maddesi
          gereği cayma hakkı kullanılamayacaktır.
        </p>
        <h2>9. KİŞİSEL VERİLERİN KORUNMASI VE FİKRİ-SINAİ HAKLAR</h2>
        <p>
          9.1. Satıcı, işbu sözleşme kapsamındaki kişisel verileri sadece
          Ürün/Hizmet'in sunulması amacıyla sınırlı olarak ve 6698 sayılı
          Kişisel Verilerin Korunması Kanunu'na, ("KVKK") ikincil mevzuata ve
          Kişisel Verileri Koruma Kurulu kararlarına uygun olarak işleyecektir.
          Satıcı, Platform üzerinden eriştiği kişisel veriler haricinde
          Alıcı'nın kişisel verilerini işlemeyeceğini ve Platform üzerinden
          sağlanan yöntemler dışında Alıcı ile harici olarak iletişime
          geçmeyeceğini kabul, beyan ve taahhüt eder.
        </p>
        <p>
          9.2. Alıcı, işbu Sözleşme kapsamında sağladığı kişisel verilerin
          doğru, eksiksiz ve güncel olduğunu kontrol etmekle, bu bilgileri
          üçüncü kişilerle paylaşmamak, ilgisiz kişilerce erişilememesi için
          virüs ve benzeri zararlı uygulamalara ilişkin olanlar dahil gerekli
          tedbirleri almak ve söz konusu kişisel verilerin güvenliğini
          sağlamakla yükümlü olduğunu, aksi halde doğacak zararlardan ve üçüncü
          kişilerden gelen taleplerden bizzat sorumlu olduğunu kabul, beyan ve
          taahhüt eder.
        </p>
        <p>
          9.3. Platform'a ait her türlü bilgi ve içerik ile bunların
          düzenlenmesi, revizyonu ve kısmen/tamamen kullanımı konusunda;
          Satıcı'nın anlaşmasına göre diğer üçüncü şahıslara ait olanlar hariç;
          tüm fikri-sınai haklar ve mülkiyet hakları Bonnmarşe'ye aittir.
        </p>
        <h2>10. CAYMA HAKKI</h2>
        <p>
          10.1. Alıcı, 15 (onbeş) gün içinde herhangi bir gerekçe göstermeksizin
          ve cezai şart ödemeksizin Sözleşme'den cayma hakkına sahiptir.
        </p>
        <p>
          10.2. Cayma hakkı süresi, Hizmet için Sözleşme'nin kurulduğu gün; Ürün
          için Alıcı'nın veya Alıcı tarafından belirlenen üçüncü kişinin Ürün'ü
          teslim aldığı gün başlar. Ancak Alıcı, Sözleşme'nin kurulmasından Ürün
          teslimine kadar olan süre içinde de cayma hakkını kullanabilir.
        </p>
        <p>10.3. Cayma hakkı süresinin belirlenmesinde;</p>
        <ul>
          <li>
            Tek sipariş konusu olup ayrı ayrı teslim edilen Ürün'de, Alıcı veya
            Alıcı tarafından belirlenen üçüncü kişinin son Ürün'ü teslim aldığı
            gün,
          </li>
          <li>
            Birden fazla parçadan oluşan Ürün'de, Alıcı veya Alıcı tarafından
            belirlenen üçüncü kişinin son parçayı teslim aldığı gün,
          </li>
          <li>
            Belirli bir süre boyunca Ürün'ün düzenli tesliminin yapıldığı
            durumlarda, Alıcı veya Alıcı tarafından belirlenen üçüncü kişinin
            ilk Ürün'ü teslim aldığı gün esas alınır.
          </li>
        </ul>
        <p>
          10.4. Ürün teslimi ile Hizmet ifasının birlikte olduğu durumlarda,
          Ürün teslimine ilişkin cayma hakkı hükümleri uygulanır.
        </p>
        <p>10.5. Satıcı;</p>
        <ul>
          <li>
            Ürün'ün teslimi veya Hizmet'in ifasından önce Alıcı'nın cayma
            hakkını kullanması durumunda cayma hakkının kullanıldığına ilişkin
            bildirimin kendisine ulaştığı tarihten itibaren,
          </li>
          <li>
            Ürün'ün tesliminden sonra Alıcı'nın cayma hakkını kullanması
            durumunda, cayma bildiriminin kendisine ulaştığı tarih itibarıyla
            bedel Satıcı'ya aktarılmamışsa cayma hakkına konu Ürün'ün, iade için
            öngörülen Kargo Şirketi'ne teslim edildiği tarihten veya iade için
            öngörülenin haricinde bir Kargo Şirketi ile iade edilmesi durumunda
            da Satıcı'ya ulaştığı tarihten itibaren,
          </li>
          <li>
            Alıcı'nın siparişinin yasal süre içerisinde teslim edilememesi
            nedeniyle Sözleşme'yi fesih hakkını kullanması durumunda fesih
            bildiriminin kendisine ulaştığı tarihten itibaren 15 (onbeş) gün
            içinde, tahsil ettiği Sözleşme konusu bedeli ile teslimat
            masraflarının Alıcı'ya iadesinden sorumludur.
          </li>
        </ul>
        <p>
          10.6. Cayma hakkı bildiriminin ve Sözleşme'ye ilişkin diğer
          bildirimlerin mevzuata uygun ve süresi içerisinde Platform'da
          belirtilen Bonnmarşe'ye ve/veya Satıcı'ya ait iletişim kanallarından
          yapılması şarttır. Cayma bildiriminin yapılacağı iletişim kanallarına
          https://www.bonnmarse.com/iletisim linkinden ulaşılabilmektedir.
        </p>
        <p>10.7. Cayma hakkının kullanılması halinde:</p>
        <ul>
          <li>
            Alıcı cayma hakkını kullanmasından itibaren 14 (ondört) gün
            içerisinde Ürün'ü Satıcı'ya Kargo Şirketi'yle geri gönderir.
          </li>
          <li>
            Cayma hakkı kapsamında iade edilecek Ürün kutusu, ambalajı, varsa
            standart aksesuarları ve varsa Ürün ile birlikte hediye edilen diğer
            Ürünler'in de eksiksiz ve hasarsız olarak iade edilmesi
            gerekmektedir.
          </li>
        </ul>
        <p>
          10.8. Alıcı cayma süresi içinde Ürün'ü, işleyişine, teknik
          özelliklerine ve kullanım talimatlarına uygun bir şekilde kullandığı
          takdirde meydana gelen değişiklik ve bozulmalardan sorumlu değildir.
        </p>
        <p>
          10.9. Cayma hakkının kullanılmasını takip eden 14 (ondört) gün
          içerisinde Sözleşme konusu bedeller Alıcı'ya Alıcı'nın ödeme yöntemi
          ile iade edilmektedir. Ürün/Hizmet, Satıcı'ya iade edilirken,
          Ürün/Hizmet'in teslimi sırasında Alıcı'ya ibraz edilmiş olan orijinal
          faturanın da Alıcı tarafından iade edilmesi gerekmektedir. Alıcı'nın
          kurumsal fatura istemesi halinde ilgili Ürün/Hizmet iadesi için iade
          faturası kesmesi veya mümkünse süresi içerisinde ticari faturayı kendi
          sistemlerinden reddetmesi gerekmektedir.
        </p>
        <p>
          10.10. Alıcı iade edeceği Ürün/Hizmet'i Ön Bilgilendirme Formu'nda
          belirtilen Satıcı'nın Kargo Şirketi ile Satıcı'ya gönderdiği sürece
          iade kargo bedeli Satıcı'ya aittir. İade için Alıcı'nın bulunduğu
          yerde Satıcı'nın Kargo Şirketi şubesi bulunmaması halinde, Alıcı
          Ürün'ü herhangi bir Kargo Şirketi'yle gönderebilecektir. Bu halde iade
          kargo bedeli ve Ürün'ün kargo sürecinde uğrayacağı hasardan Satıcı
          sorumludur.
        </p>
        <p>
          10.11. Alıcı cayma hakkını işbu maddede belirtilen süre ve usuller
          dahilinde kullanacak olup aksi halde cayma hakkını kaybedecektir.
        </p>
        <h2>11. CAYMA HAKKININ KULLANILAMAYACAĞI HALLER</h2>
        <p>11.1. Alıcı aşağıdaki sözleşmelerde cayma hakkını kullanamaz:</p>

        <ul>
          <li>
            Fiyatı finansal piyasalardaki dalgalanmalara bağlı olarak değişen ve
            Satıcı veya Bonnmarşe'nin kontrolünde olmayan mal veya hizmetlere
            ilişkin sözleşmeler,
          </li>
          <li>
            Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda
            hazırlanan mallara ilişkin sözleşmeler,
          </li>
          <li>
            Çabuk bozulabilen veya son kullanma tarihi geçebilecek malların
            teslimine ilişkin sözleşmeler,
          </li>
          <li>
            Tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu
            unsurları açılmış olan mallardan; iadesi sağlık ve hijyen açısından
            uygun olmayanların teslimine ilişkin sözleşmeler,
          </li>
          <li>
            Tesliminden sonra başka ürünlerle karışan ve doğası gereği
            ayrıştırılması mümkün olmayan mallara ilişkin sözleşmeler,
          </li>
          <li>
            Ürünün tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu
            unsurları açılmış olması halinde maddi ortamda sunulan kitap,
            dijital içerik ve bilgisayar sarf malzemelerine ilişkin sözleşmeler,
          </li>
          <li>
            Abonelik sözleşmesi kapsamında sağlananlar dışında gazete ve dergi
            gibi süreli yayınların teslimine ilişkin sözleşmeler,
          </li>
          <li>
            Belirli bir tarihte veya dönemde yapılması gereken, konaklama, eşya
            taşıma, araba kiralama, yiyecek içecek tedariki ve eğlence veya
            dinlenme amacıyla yapılan boş zamanın değerlendirilmesine ilişkin
            sözleşmeler,
          </li>
          <li>
            Elektronik ortamda anında ifa edilen hizmetler ile Alıcı'ya anında
            teslim edilen gayri maddi mallara ilişkin sözleşmeler,
          </li>
          <li>
            Cayma hakkı süresi sona ermeden önce, Alıcı'nın onayı ile ifasına
            başlanan hizmetlere ilişkin sözleşmeler, cayma hakkı
            kullanılamayacak; bu siparişler bakımından Platform üzerinden iade
            kodu da oluşturulamayacaktır.
          </li>
        </ul>
        <p>
          11.2. Ürün/Hizmet'in Yönetmelik'in uygulama alanı dışında bırakılmış
          olan (Sözleşme'nin 3.3. maddesinde listelenmiştir) Ürün/Hizmet
          türlerinden müteşekkil olması halinde Alıcı ve Satıcı arasındaki
          hukuki ilişkiye Yönetmelik hükümleri uygulanamaması sebebiyle cayma
          hakkı kullanılamayacak; bu siparişler bakımından Platform üzerinden
          iade kodu da oluşturulamayacaktır.
        </p>
        <p>
          11.3. Platform üzerinden elektronik kod satın alındığı durumlarda
          bahse konu siparişlerde Yönetmelik gereği cayma hakkı söz konusu
          olmayacaktır. Bu siparişler bakımından Platform üzerinden iade kodu da
          oluşturulamayacaktır.
        </p>
        <h2>12. UYUŞMAZLIKLARIN ÇÖZÜMÜ</h2>
        <p>
          12.1. Sözleşme'nin uygulanmasında, Bakanlık'ça ilan edilen değerlere
          uygun olarak Alıcı'nın Ürün/Hizmet'i satın aldığı ve ikametgahının
          bulunduğu yerdeki Tüketici Hakem Heyetleri ile Tüketici Mahkemeleri
          yetkilidir.
        </p>
        <h2>13. BİLDİRİMLER ve DELİL SÖZLEŞMESİ</h2>
        <p>
          13.1. Sözleşme tahtında Taraflar arasında yapılacak her türlü yazışma,
          mevzuatta sayılan zorunlu haller dışında, yazılı olarak yapılacaktır.
        </p>
        <p>
          13.2. Alıcı, Sözleşme'den doğabilecek ihtilaflarda Bonnmarşe'nin ve
          Satıcı'nın ticari defter, bilgisayar, kayıt ve diğer belgelerinin
          bağlayıcı, kesin ve münhasır delil teşkil edeceğini, bu maddenin Hukuk
          Muhakemeleri Kanunu'nun 193. maddesi anlamında delil sözleşmesi
          niteliğinde olduğunu kabul, beyan ve taahhüt eder.
        </p>
        <h2>14. YÜRÜRLÜK</h2>
        <p>
          14.1. 14 (on dört) maddeden ibaret Sözleşme, Taraflar'ca okunarak,
          işlem tarihinde, Alıcı tarafından elektronik ortamda onaylanmak
          suretiyle akdedilmiş ve yürürlüğe girmiştir. Sözleşme'nin bir nüshası
          Alıcı'nın üyelik hesabında mevcuttur ve talep edilmesi halinde ayrıca
          elektronik posta ile de gönderilebilecektir.
        </p>
      </div>
    </div>
  );
};

export default DistanceSalesContract;
