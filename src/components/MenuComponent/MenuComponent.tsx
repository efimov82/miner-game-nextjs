import Link from "next/link";
import { useTranslation } from "next-i18next";
import { LangSwitcherComponent } from "../LangSwitcherComponent/LangSwitcherComponent";
import { Container, Nav, Navbar } from "react-bootstrap";

export function MenuComponent(props: {}) {
  const { t } = useTranslation("menu");

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Minesweeper</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref>
              <Nav.Link>{t("rules")}</Nav.Link>
            </Link>
            <Link href="/top" passHref>
              <Nav.Link>{t("top20")}</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="#memes">
              <LangSwitcherComponent />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
