import Link from "next/link";
import { Building2, Smartphone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#6d787d] text-white font-sans text-sm">
            {/* Top Bar */}
            <div className="border-b border-gray-500">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <span className="text-3xl font-extrabold tracking-tighter">OYO</span>
                        <span className="font-semibold text-lg hidden md:inline">World's leading chain of hotels and homes</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="font-semibold hidden md:inline">Join our network and grow your business!</span>
                        <Link href="#" className="bg-white text-gray-800 px-4 py-2 rounded flex items-center font-medium hover:bg-gray-100 transition">
                            <Building2 className="w-4 h-4 mr-2" />
                            List your property
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Main Links Section */}
                <div className="flex flex-col md:flex-row justify-between mb-12 border-b border-gray-500 pb-12">
                    {/* App Download */}
                    <div className="mb-8 md:mb-0 md:w-1/3 pr-8 border-r border-gray-500">
                        <h3 className="text-lg font-semibold mb-4">Download OYO app for exciting offers.</h3>
                        <div className="flex space-x-4">
                            <button className="bg-black text-white px-4 py-2 rounded flex items-center border border-gray-600 hover:bg-gray-900">
                                <Smartphone className="w-6 h-6 mr-2" />
                                <div className="text-left">
                                    <div className="text-[10px] leading-none">Download on the</div>
                                    <div className="text-sm font-bold">App Store</div>
                                </div>
                            </button>
                            <button className="bg-black text-white px-4 py-2 rounded flex items-center border border-gray-600 hover:bg-gray-900">
                                <Smartphone className="w-6 h-6 mr-2" />
                                <div className="text-left">
                                    <div className="text-[10px] leading-none">Get it on</div>
                                    <div className="text-sm font-bold">Google Play</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3 md:pl-8">
                        <div className="space-y-2">
                            <Link href="#" className="block hover:underline">About Us</Link>
                            <Link href="#" className="block hover:underline">Teams / Careers</Link>
                            <Link href="#" className="block hover:underline">Blogs</Link>
                            <Link href="#" className="block hover:underline">Support</Link>
                        </div>
                        <div className="space-y-2">
                            <Link href="#" className="block hover:underline">Official OYO Blog</Link>
                            <Link href="#" className="block hover:underline">Investor Relations</Link>
                            <Link href="#" className="block hover:underline">OYO Circle</Link>
                            <Link href="#" className="block hover:underline">OYO Frames</Link>
                        </div>
                        <div className="space-y-2">
                            <Link href="#" className="block hover:underline">Terms and conditions</Link>
                            <Link href="#" className="block hover:underline">Guest Policies</Link>
                            <Link href="#" className="block hover:underline">Privacy Policy</Link>
                            <Link href="#" className="block hover:underline">Trust And Safety</Link>
                        </div>
                        <div className="space-y-2">
                            <Link href="#" className="block hover:underline">Cyber Security</Link>
                            <Link href="#" className="block hover:underline">Cyber Security Awareness</Link>
                            <Link href="#" className="block hover:underline">Responsible Disclosure</Link>
                            <Link href="#" className="block hover:underline">Advertise your Homes</Link>
                        </div>
                    </div>
                </div>

                {/* OYO Hotels Section */}
                <div>
                    <h3 className="text-lg font-bold mb-6 border-b border-gray-500 pb-2 inline-block">OYO Hotels</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 text-xs text-gray-300">
                        <Link href="#" className="hover:text-white">Hotels near me</Link>
                        <Link href="#" className="hover:text-white">Hotels in Goa</Link>
                        <Link href="#" className="hover:text-white">Hotels in Puri</Link>
                        <Link href="#" className="hover:text-white">Hotels in Mahabaleshwar</Link>
                        <Link href="#" className="hover:text-white">Hotels in Jaipur</Link>
                        <Link href="#" className="hover:text-white">Hotels in Shimla</Link>
                        <Link href="#" className="hover:text-white">Hotels in Manali</Link>
                        <Link href="#" className="hover:text-white">Hotels in Udaipur</Link>
                        <Link href="#" className="hover:text-white">Hotels in Mussoorie</Link>
                        <Link href="#" className="hover:text-white">Hotels in Pondicherry</Link>
                        <Link href="#" className="hover:text-white">Hotels in Delhi</Link>
                        <Link href="#" className="hover:text-white">Hotels in Mumbai</Link>
                        <Link href="#" className="hover:text-white">Hotels in Nainital</Link>
                        <Link href="#" className="hover:text-white">Hotels in Lonavala</Link>
                        <Link href="#" className="hover:text-white">Hotels in Munnar</Link>
                        <Link href="#" className="hover:text-white">Hotels in Bangalore</Link>
                        <Link href="#" className="hover:text-white">Hotels in Mysore</Link>
                        <Link href="#" className="hover:text-white">Hotels in Darjeeling</Link>
                        <Link href="#" className="hover:text-white">Hotels in Mount Abu</Link>
                        <Link href="#" className="hover:text-white">Hotels in Kodaikanal</Link>
                        <Link href="#" className="hover:text-white">Hotels in Hyderabad</Link>
                        <Link href="#" className="hover:text-white">Hotels in Pune</Link>
                        <Link href="#" className="hover:text-white">Hotels in Chandigarh</Link>
                        <Link href="#" className="hover:text-white">Hotels in Shirdi</Link>
                        <Link href="#" className="hover:text-white">Hotels in Agra</Link>
                        <Link href="#" className="hover:text-white">Hotels in Gangtok</Link>
                        <Link href="#" className="hover:text-white">Hotels in Coorg</Link>
                        <Link href="#" className="hover:text-white">Hotels in Chennai</Link>
                        <Link href="#" className="hover:text-white">Hotels in Tirupati</Link>
                        <Link href="#" className="hover:text-white">Hotels in Dalhousie</Link>
                        <Link href="#" className="hover:text-white">Hotels in Haridwar</Link>
                        <Link href="#" className="hover:text-white">Hotels in Kolkata</Link>
                        <Link href="#" className="hover:text-white">Hotels in Ahmedabad</Link>
                        <Link href="#" className="hover:text-white">Hotels in Shillong</Link>
                        <Link href="#" className="hover:text-white">Hotels in Rishikesh</Link>
                        <Link href="#" className="hover:text-white">Hotels in Varanasi</Link>
                        <Link href="#" className="hover:text-white">Hotels in Gurgaon</Link>
                        <Link href="#" className="hover:text-white">Hotels in Mandarmoni</Link>
                        <Link href="#" className="hover:text-white">Hotels in Daman</Link>
                        <Link href="#" className="hover:text-white">Hotels in Yercaud</Link>
                        <Link href="#" className="hover:text-white">Hotels in Amritsar</Link>
                        <Link href="#" className="hover:text-white">Hotels in Madurai</Link>
                        <Link href="#" className="hover:text-white">Hotels in Coimbatore</Link>
                        <Link href="#" className="hover:text-white">Hotels in Kasauli</Link>
                        <Link href="#" className="hover:text-white">Hotels in Dehradun</Link>
                        <Link href="#" className="hover:text-white">Travel Guide</Link>
                        <Link href="#" className="hover:text-white">All Cities Hotels</Link>
                        <Link href="#" className="hover:text-white">Coupons</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
