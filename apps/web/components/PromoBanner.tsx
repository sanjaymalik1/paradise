import Image from "next/image";

export default function PromoBanner() {
  return (
    <section className="w-[80%] mx-auto flex flex-col gap-10 xl:gap-16 items-center mt-10 xl:mt-12">
      <Image
        src="/images/promo/promo1.avif"
        alt="Promo 1"
        width={1280}
        height={520}
      />
      
      <Image
        src="/images/promo/promo2.avif"
        alt="Promo 2"
        width={1280}
        height={520}
      />
    </section>
  );
}