import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineWrench } from "react-icons/hi2";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { BiSupport } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoTiktok } from "react-icons/io5";

const socials = [
  {
    icon: <FaFacebookF />,
    link: "",
  },
  {
    icon: <FaInstagram />,
    link: "",
  },
  {
    icon: <FaXTwitter />,
    link: "",
  },
  {
    icon: <IoLogoTiktok />,
    link: "",
  },
];

const Footer = () => {
  return (
    <footer className="bg-black pb-10 text-light">
      <div className="relative">
        <div className="h-[500px] overflow-hidden">
          <Image
            src="/FIL Rebrand new_page-0002.jpg"
            width={1920}
            height={1080}
            alt="fil"
            className="brightness-50 object-contain"
          />
        </div>
        <div className="top-1/2 left-1/2 absolute text-center -translate-x-1/2 -translate-y-1/2">
          <p className="mb-4 text-light text-4xl">Think Fil, Think Quality</p>
          <Link
            className="text-light"
            href=""
          >
            Watch Full Video
          </Link>
        </div>
      </div>

      {/* FOOTER DESC */}
      <p className="mx-20 py-10 border-gray-400 border-b text-filgrey text-xs text-center">
        At FIL, we take pride in offering quality products at unbeatable prices,
        making us the go-to destination for anyone who values quality.(Think
        quality, think FIL)
      </p>

      {/* FOOTER SUBSCRIPTION */}
      <div className="place-items-center py-10 text-center">
        <p className="text-xl">
          Subscribe now to get a gift with your first order!
        </p>
        <h3 className="mt-2 mb-8 font-semibold text-white text-4xl">
          Get an Exclusive 15% Off Your First Purchase
        </h3>

        <div className="flex">
          <input
            className="bg-light bg-ligt p-2 border-0 outline-0 sm:w-[400px] text-filgrey"
            placeholder="Email"
            type="email"
          />
          <button className="buttons">SignUp</button>
        </div>
      </div>

      {/* FOOTER SERVICES    */}
      <div className="mx-5 xs:mx-10 lg:mx-20 py-5 lg:py-10 border-filgrey border-t border-b">
        <h2 className="mb-2 font-bold text-white">Buy on the Fil Store</h2>
        <div className="grid sm:grid-cols-2 text-sm">
          <div className="max-sm:mb-2">
            <div className="flex items-center gap-2 mb-2 text-filgrey">
              <span>
                <HiOutlineWrench className="text-filgrey text-2xl" />
              </span>
              Hassle-Free Warranty
            </div>

            <div className="flex items-center gap-2 text-filgrey">
              <span>
                <BiSolidPlaneAlt className="text-filgrey text-2xl" />
              </span>
              Fast, Free Shipping
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2 text-filgrey">
              <span>
                <TbCurrencyNaira className="text-filgrey text-2xl" />
              </span>
              Value for your money
            </div>

            <div className="flex items-center gap-2 text-filgrey">
              <span>
                <BiSupport className="text-filgrey text-2xl" />
              </span>
              Lifetime Customer Support
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER CONTACT */}
      <div className="mx-5 xs:mx-10 lg:mx-20 py-5 lg:py-10 border-filgrey border-t border-b">
        <h2 className="mb-2 font-bold text-white">Contact Us</h2>
        <div className="grid sm:grid-cols-2 text-sm">
          <div className="max-sm:mb-2">
            <div className="flex items-center gap-2">
              <span>
                <FiPhoneCall className="text-filgrey text-2xl" />
              </span>
              <div>
                <h2 className="font-bold text-white">
                  For FIL: 1-800-988-7973
                </h2>
                <div className="text-filgrey">Fast, Free Shipping</div>
              </div>
            </div>
          </div>

          <div className="max-sm:mb-2 max-sm:py-3">
            <div className="flex items-center gap-2">
              <span>
                <HiOutlineMail className="text-filgrey text-2xl" />
              </span>
              <div>
                <h2 className="font-bold text-white">SUPPORT@FIL.COM</h2>
              </div>
            </div>
          </div>

          <div className="sm:mt-8">
            <div className="">
              <h2 className="font-bold text-white">SOCIALS</h2>
              <div className="flex gap-2 mt-2 text-filgrey">
                {socials.map((social, index) => (
                  <div
                    className="bg-filgrey hover:bg-dark p-1 xs:p-2 rounded-full w-5 xs:w-10 h-5 xs:h-10 text-dark hover:text-filgrey text-xs xs:text-2xl"
                    key={index}
                  >
                    {social.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
