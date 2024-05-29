import { useEffect, useState } from "react";

// Helpers
import { prompStore } from "../main/mainCont";

// icons
import InstallIcon from "../../../assets/icons/installIcon.svg?react";

// Components
import { useDispatch } from "react-redux";
import DisconnectIcon from "../../../assets/icons/disconnectIcon.svg?react";
import { handleLogout } from "../../../controllers/general/helpers";
import { useLanguage } from "../../../controllers/hooks/useLanguages";
import IconButton from "../../components/iconButton/IconButton";
import Menu from "../../components/menu/Menu";
import MenuOption from "../../components/menu/MenuOption";
import { install } from "../../../App";

export default function HomeHeader() {
  // Use State
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const { t, dir } = useLanguage();

  useEffect(() => {
    // for deferred app install
    setDeferredPrompt(install.deferredPrompt);
  }, []);

  function handleInstallApp() {
    try {
      prompStore(setDeferredPrompt);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`homePage__header ${dir}`}>
      <img className="treeImg" src="/src/assets/images/tree.png"></img>

      <div className="homePage__header__wrapper">
        <div
          className="homePage__header__wrapper__title"
          children={t("Delib")}
        />
        <div className="homePage__header__wrapper__icons">
          {deferredPrompt && (
            <IconButton onClick={handleInstallApp}>
              <InstallIcon />
            </IconButton>
          )}

          <Menu
            isMenuOpen={isHomeMenuOpen}
            setIsOpen={setIsHomeMenuOpen}
            iconColor="white"
          >
            <MenuOption
              icon={<DisconnectIcon style={{ color: "#4E88C7" }} />}
              label={t("Disconnect")}
              onOptionClick={() => handleLogout(dispatch)}
            />
          </Menu>
        </div>
      </div>
    </div>
  );
}
