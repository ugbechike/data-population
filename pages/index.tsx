import Image from "next/image";
import { HomeScreen } from "../screen/home-screen";
import { Logo } from "../components/logo/logo";
import Link from "next/link";
import { BannerLogo } from "../components/logo/banner-logo";
import { FaceBook } from "../components/icons/facebook";

export default function Home() {
  return (
    <div>
      <div className={"banner"}>
        <div className={"banner_content"}>
          <header className={"navbar"}>
            <Logo />
            <div className={"banner_menu"}>
              <Link href="/">
                <a>Country table</a>
              </Link>
              <Link href="/language/language">
                <a>Language table</a>
              </Link>
            </div>
          </header>
        </div>
        <div className={"banner__input-box-wrapper"}>
          <BannerLogo />
        </div>
      </div>

      <main className={"main"}>
        <HomeScreen />
      </main>

      <footer className={"footer"}>
        <div className={"footer_content"}>
          <Logo />
          <div className={"footer_details"}>
            <p>Karenslyst Allé 16D, 0278 Oslo</p>
            <p>
              <a href="mailto:support@porterbuddy.com">
                support@porterbuddy.com
              </a>
            </p>
            <p>Telefon +47 923 34 015</p>
            <p>Telefon +47 923 34 015</p>
          </div>
        </div>
        {/*<div className={"footer_socials"}>*/}
        {/*  <FaceBook />*/}
        {/*</div>*/}
      </footer>
    </div>
  );
}
