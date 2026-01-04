import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useUserPreferences, ThemeColor, FontSize } from "../contexts/UserPreferencesContext";

interface Props {
  show: boolean;
  onHide: () => void;
}

const Settings = ({ show, onHide }: Props) => {
  const { themeColor, fontSize, setThemeColor, setFontSize } = useUserPreferences();

  const themeColors: { value: ThemeColor; label: string; color: string }[] = [
    { value: "dark", label: "Escuro", color: "#212529" },
    { value: "light", label: "Claro", color: "#f8f9fa" },
    { value: "blue", label: "Azul", color: "#0d6efd" },
    { value: "green", label: "Verde", color: "#198754" },
    { value: "purple", label: "Roxo", color: "#6f42c1" },
  ];

  const fontSizes: { value: FontSize; label: string }[] = [
    { value: "small", label: "Pequeno" },
    { value: "medium", label: "Médio" },
    { value: "large", label: "Grande" },
    { value: "extra-large", label: "Extra Grande" },
  ];

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Configurações</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label>Tema</Form.Label>
            <Row className="g-2">
              {themeColors.map((theme) => (
                <Col key={theme.value} xs={6} sm={4}>
                  <Button
                    variant={themeColor === theme.value ? "primary" : "outline-secondary"}
                    className="w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => setThemeColor(theme.value)}
                    style={{ height: "50px" }}
                  >
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: theme.color,
                        borderRadius: "50%",
                        border: "2px solid white",
                      }}
                    />
                    <span>{theme.label}</span>
                  </Button>
                </Col>
              ))}
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tamanho da Fonte</Form.Label>
            <Row className="g-2">
              {fontSizes.map((size) => (
                <Col key={size.value} xs={6}>
                  <Button
                    variant={fontSize === size.value ? "primary" : "outline-secondary"}
                    className="w-100"
                    onClick={() => setFontSize(size.value)}
                  >
                    {size.label}
                  </Button>
                </Col>
              ))}
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Settings;
