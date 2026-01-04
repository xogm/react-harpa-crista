import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, ListGroup, Card, Badge } from "react-bootstrap";
import { HymnsApi, Hymns } from "../../utils/hymnsApi";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const navigate = useNavigate();
  const [hymns, setHymns] = useState<Hymns | null>();

  useEffect(() => {
    HymnsApi.getHymns().then(setHymns);

    return () => {
      setHymns(null);
    };
  }, []);

  if (!hymns) {
    return <Loading />;
  }

  return (
    <Row>
      <Col>
        <Card className="mb-4 bg-light">
          <Card.Body>
            <h1 className="display-4">
              <FontAwesomeIcon icon={faMusic} className="me-3" />
              Harpa Cristã
            </h1>
            <p className="lead">
              Navegue pela coleção completa de hinos da Harpa Cristã
            </p>
            <p className="text-muted mb-0">
              Total de {hymns.totalPages * 10} hinos disponíveis
            </p>
          </Card.Body>
        </Card>
        <ListGroup className="my-4">
          {hymns?.hymns.map((hymn) => (
            <ListGroup.Item
              key={hymn.number}
              action
              onClick={() => navigate(`/hymn/${hymn.number}`)}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <Badge bg="dark" className="me-2">
                  {hymn.number}
                </Badge>
                <span>{hymn.title}</span>
              </div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/hymn/${hymn.number}`);
                }}
              >
                Ver Hino
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Pagination
          currentPage={hymns.currentPage}
          totalPages={hymns.totalPages}
          onPageChange={(page) => {
            setHymns(null);
            HymnsApi.getHymns(page).then(setHymns);
          }}
        />
      </Col>
    </Row>
  );
}

export default Home;
