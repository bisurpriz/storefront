import { PageProps } from "@/.next/types/app/page";
import Badge from "@/components/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";

export default async function BlogPostPage({
  params,
  searchParams,
}: PageProps) {
  return (
    <article className="container prose prose-lg mx-auto max-w-5xl px-4 py-8 dark:prose-invert max-md:prose-sm">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">
          Yapay Zeka ve Geleceğimiz: Fırsatlar ve Zorluklar
        </h1>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="Yazar"
            />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <div>
            <p className="!m-0 text-base font-semibold">Yazar Adı</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarIcon className="mr-1 h-4 w-4" />
              <time dateTime="2023-11-10">10 Kasım 2023</time>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Badge text={"Yapay Zeka"}></Badge>
          <Badge text={"Teknoloji"}></Badge>
          <Badge text={"Gelecek"}></Badge>
        </div>
      </header>

      <figure className="mb-8">
        <Image
          src="https://via.placeholder.com/800x400"
          alt="Yapay zeka görseli"
          width={800}
          height={400}
          className="mx-auto rounded-lg object-cover"
        />
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          Yapay zeka teknolojisini temsil eden görsel
        </figcaption>
      </figure>

      <div>
        <p>
          Yapay zeka (YZ), günümüzde teknolojinin en hızlı gelişen ve en çok
          tartışılan alanlarından biri. İnsanların yaptığı işleri daha hızlı,
          daha verimli ve bazen daha doğru bir şekilde yapabilen YZ sistemleri,
          hayatımızın neredeyse her alanına girmiş durumda.
        </p>

        <h2>Yapay Zekanın Sunduğu Fırsatlar</h2>
        <p>
          YZ teknolojisi, sağlıktan eğitime, ulaşımdan finansa kadar birçok
          alanda devrim niteliğinde değişiklikler vaat ediyor. Örneğin, tıp
          alanında YZ destekli tanı sistemleri, hastalıkların erken teşhisinde
          doktorlara yardımcı oluyor.
        </p>

        <h2>Karşılaşılan Zorluklar ve Etik Sorunlar</h2>
        <p>
          Ancak, YZ'nin yaygınlaşması beraberinde bazı zorlukları ve etik
          sorunları da getiriyor. Veri gizliliği, iş gücü piyasasındaki
          değişimler ve YZ sistemlerinin kararlarının sorumluluğu gibi konular,
          üzerinde dikkatle durulması gereken meseleler.
        </p>

        <h2>Sonuç</h2>
        <p>
          Yapay zeka, insanlığa büyük fırsatlar sunmakla birlikte, dikkatli bir
          şekilde yönetilmesi ve düzenlenmesi gereken bir teknolojidir.
          Gelecekte YZ ile uyum içinde yaşayabilmek için, bu teknolojinin etik
          ve sorumlu bir şekilde geliştirilmesi ve kullanılması büyük önem
          taşıyor.
        </p>
      </div>
    </article>
  );
}
