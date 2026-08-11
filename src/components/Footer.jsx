import engrenagemFooter from "../assets/icon/engrenagem-footer.svg";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="div-footer">
        <h2 className="footer-title">
          Desenvolvido por{" "}
          <Link to={"https://github.com/tiagolino26"} className="footer-link">
            Tiago lino
          </Link>{" "}
        </h2>
        <img
          src={engrenagemFooter}
          alt="engrenagem"
          className="footer-engrenagem"
        />
      </div>
    </footer>
  );
}

export default Footer;
