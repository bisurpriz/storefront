import clsx from "clsx";
import React from "react";

const Paragraph = ({ children }) => {
  return (
    <p className={clsx("text-base text-gray-700", "leading-7 md:leading-8")}>
      {children}
    </p>
  );
};

const AboutUs = () => {
  return (
    <section
      aria-label="Hakkımızda"
      aria-labelledby="hakkimizda"
      aria-describedby="hakkimizda"
    >
      <h2 id="hakkimizda" className="text-2xl font-semibold py-8">
        Hakkımızda
      </h2>
      <div
        id="hakkimizda"
        className={clsx(
          "w-full max-w-screen-2xl",
          "flex flex-col items-center justify-center space-y-6"
        )}
      >
        <Paragraph>
          Bonnmarşe, online olarak çiçekçi, çikolatacı ve aksesuar ürünleri gibi
          çeşitli kategorilerdeki satıcıları ve müşterileri bir araya getiren
          bir e-ticaret platformudur. 2023 yılında Ankara’da kurulmuş olan
          firmamız, hem satıcılara hem de müşterilere değer katmayı amaçlayan
          yenilikçi ve kullanıcı dostu bir hizmet sunmaktadır.
        </Paragraph>
        <Paragraph>
          Firmamızın temel misyonu, kullanıcılarımıza geniş ürün yelpazesi,
          kaliteli hizmet ve güvenli alışveriş deneyimi sunarak sektörde fark
          yaratmaktır. Bonnmarşe, satıcılar için ürünlerini daha geniş kitlelere
          ulaştırma ve işlerini büyütme fırsatı sağlarken, müşterilere ise
          ihtiyaçlarına ve zevklerine en uygun ürünleri kolaylıkla bulma imkanı
          sunar.
        </Paragraph>
        <Paragraph>
          Çiçekçilikten çikolatacılığa, aksesuardan özel hediye seçeneklerine
          kadar geniş bir ürün yelpazesi sunan Bonnmarşe, her zevke ve bütçeye
          hitap eden ürünlerle kullanıcılarının memnuniyetini en üst düzeyde
          tutmayı hedefler. Ankara merkezli ekibimiz, sektördeki yenilikleri
          yakından takip ederek ve müşteri geri bildirimlerini dikkate alarak
          hizmet kalitemizi sürekli olarak geliştirmekte ve yenilemekteyiz.
        </Paragraph>
        <Paragraph>
          Bonnmarşe olarak, kullanıcılarımızın alışveriş deneyimini
          kolaylaştırmak ve keyifli hale getirmek için sürekli çalışıyor,
          müşteri memnuniyetini her zaman önceliğimiz olarak kabul ediyoruz.
          Güvenli ödeme seçenekleri, hızlı teslimat ve etkili müşteri hizmetleri
          ile alışveriş sürecinin her aşamasında kullanıcılarımızın yanında
          olmayı amaçlıyoruz.
        </Paragraph>
        <Paragraph>
          Bonnmarşe’ye katılarak, siz de bu büyük ailenin bir parçası olabilir
          ve alışverişin keyfini çıkarabilirsiniz. Sizin için en değerli olanı
          bulmak ve sevdiklerinize özel anlar yaşatmak için doğru yerdesiniz.
          Her zaman yanınızda olan Bonnmarşe ile alışverişin en güzel hali şimdi
          parmaklarınızın ucunda!
        </Paragraph>
      </div>
    </section>
  );
};

export default AboutUs;
