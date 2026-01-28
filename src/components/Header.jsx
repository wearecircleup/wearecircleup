import { useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { navigation } from "../constants";
import Button from "./Button";
import Logo from "./Logo";
import MenuSvg from "./design/Header";
import { HambugerMenu } from "./design/Header";

const Header = ({ setCurrentPage }) => {
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[100] border-b border-n-6 lg:bg-n-8/90 lg:bg-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 relative z-[101]">
        <Logo 
          className="xl:mr-8" 
          logoSize={{ width: 60, height: 60 }}
          textSize="text-xl"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentPage && setCurrentPage('home');
          }}
        />

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              item.url.startsWith('/') || item.url.startsWith('#') ? (
                <a
                  key={item.id}
                  onClick={() => {
                    handleClick();
                    // Scroll to top of page
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    if (item.url === '/features') {
                      setCurrentPage && setCurrentPage('features');
                    } else if (item.url === '/aliados') {
                      setCurrentPage && setCurrentPage('aliados');
                    } else if (item.url === '/voluntarios') {
                      setCurrentPage && setCurrentPage('voluntarios');
                    } else if (item.url === '/participantes') {
                      setCurrentPage && setCurrentPage('participantes');
                    } else if (item.url === '#how-to-use') {
                      setCurrentPage && setCurrentPage('how-to-use');
                    } else if (item.url === '/roadmap') {
                      setCurrentPage && setCurrentPage('roadmap');
                    } else if (item.url === '/policies') {
                      setCurrentPage && setCurrentPage('policies');
                    } else if (item.url === '/login') {
                      setCurrentPage && setCurrentPage('login');
                    } else {
                      setCurrentPage && setCurrentPage('home');
                    }
                  }}
                  className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 cursor-pointer ${
                    item.onlyMobile && "lg:hidden"
                  } px-6 py-6 md:py-8 lg:mr-0.25 lg:text-xs lg:font-semibold lg:text-n-1/50 lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                >
                  {item.title}
                </a>
              ) : (
                <a
                  key={item.id}
                  href={item.url}
                  target={item.external ? "_blank" : "_self"}
                  rel={item.external && "noreferrer noopener"}
                  onClick={handleClick}
                  className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                    item.onlyMobile && "lg:hidden"
                  } px-6 py-6 md:py-8 lg:mr-0.25 lg:text-xs lg:font-semibold lg:text-n-1/50 lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                >
                  {item.title}
                </a>
              )
            ))}
          </div>

          <HambugerMenu />
        </nav>

        <Button 
          className="hidden lg:flex" 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentPage && setCurrentPage('login');
          }}
        >
          únete a nosotros
        </Button>

        <Button
          onClick={toggleNavigation}
          className="ml-auto lg:hidden relative z-[102]"
          px="px-3"
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
