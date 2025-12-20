import Image from "next/image";
import Link from "next/link";

export default function GlobalPresence() {

    const countries = [
    { name: 'Indonesia', color: 'bg-green-500' },
    { name: 'Malaysia', color: 'bg-red-400' },
    { name: 'Denmark', color: 'bg-orange-400' },
    { name: 'US', color: 'bg-cyan-400' },
    { name: 'UK', color: 'bg-pink-400' },
    { name: 'Netherlands', color: 'bg-indigo-400' }
  ];

    return (
        <section className="w-full bg-gray-100 py-10 px-4 flex">
            <div>
                <Image
                    src="/images/map.avif"
                    alt="Promo 1"
                    width={860}
                    height={400}
                    priority={false}
                />
            </div>

            <div className="p-8 ml-8">
                <div className="max-w-4xl">
                    {/* Main Heading */}
                    <h1 className=" md:text-3xl font-bold text-gray-900 mb-6">
                        There's an OYO around. Always.
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg text-gray-600 mb-8">
                        More Destinations. More Ease. More Affordable.
                    </p>

                    {/* Stats Section */}
                    <div className="flex items-start gap-10 mb-12">
                        {/* Countries */}
                        <div>
                            <div className="text-4xl font-bold text-gray-900 mb-1">35+</div>
                            <div className="text-gray-600">Countries</div>
                        </div>

                        {/* Divider */}
                        <div className="h-18 w-px bg-gray-400 rotate-32"></div>

                        {/* Hotels & Homes */}
                        <div>
                            <div className="text-4xl font-bold text-gray-900 mb-1">174,000+</div>
                            <div className="text-gray-600">Hotels & Homes</div>
                        </div>
                    </div>

                    {/* Countries Flex Layout */}
                    <div className="flex flex-wrap gap-x-32 gap-y-6">
                        {countries.map((country, index) => (
                            <div key={index} className="flex items-center gap-3 w-30">
                                <div className={`w-2 h-2 rounded-full ${country.color}`}></div>
                                <Link href={`/${country.name}`}><span className="text-gray-700 text-md font-semibold">{country.name}</span></Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    )
}