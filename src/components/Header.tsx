import { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useUserPreferences } from "../contexts/UserPreferencesContext";
import Settings from "./Settings";

function Header() {
  const navigate = useNavigate();
  const { themeColor } = useUserPreferences();
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"title" | "number" | "verse">("number");
  const [showSettings, setShowSettings] = useState(false);

  const handleSearch = () => {
    if (search) {
      navigate(`/search/${type}/${search}`);
      setSearch("");
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.id as "title" | "number" | "verse");
  };

  return (
    <>
      <Navbar bg={themeColor} variant={themeColor === "light" ? "light" : "dark"} expand="lg">
        <Container>
          <Link to="/" className="navbar-brand">
            Harpa Cristã
          </Link>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="me-auto">
              <Form.Group className="d-flex align-items-center gap-2">
                <Form.Control
                  type="search"
                  placeholder="Buscar"
                  aria-label="Buscar"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <Button variant={themeColor === "light" ? "outline-dark" : "outline-light"} onClick={handleSearch}>
                  Buscar
                </Button>
              </Form.Group>
              <Row className="ms-2">
                <Col className="d-flex align-items-center gap-2">
                  <span className={themeColor === "light" ? "text-dark" : "text-light"}>Buscar por:</span>
                  <Form.Check
                    type="radio"
                    name="type"
                    id="number"
                    label="Número"
                    className={themeColor === "light" ? "text-dark" : "text-light"}
                    checked={type === "number"}
                    onChange={handleTypeChange}
                  />
                  <Form.Check
                    type="radio"
                    name="type"
                    id="title"
                    label="Título"
                    className={themeColor === "light" ? "text-dark" : "text-light"}
                    checked={type === "title"}
                    onChange={handleTypeChange}
                  />
                  <Form.Check
                    type="radio"
                    name="type"
                    id="verse"
                    label="Trecho"
                    className={themeColor === "light" ? "text-dark" : "text-light"}
                    checked={type === "verse"}
                    onChange={handleTypeChange}
                  />
                </Col>
              </Row>
            </Nav>
            <Nav>
              <Button
                variant={themeColor === "light" ? "outline-dark" : "outline-light"}
                onClick={() => setShowSettings(true)}
                title="Configurações"
              >
                <FontAwesomeIcon icon={faCog} />
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Settings show={showSettings} onHide={() => setShowSettings(false)} />
    </>
  );
}

export default Header;
