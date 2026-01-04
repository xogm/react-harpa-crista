import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, ListGroup, Badge, Card, Alert } from "react-bootstrap";
import { HymnsApi, Hymns } from "../../utils/hymnsApi";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

function Search() {
  const navigate = useNavigate();
  const { type, query } = useParams();
  const [hymns, setHymns] = useState<Hymns | null>();

  const getSearchTypeLabel = () => {
    switch (type) {
      case "title":
        return "Título";
      case "number":
        return "Número";
      case "verse":
        return "Trecho";
      default:
        return type;
    }
  };

  useEffect(() => {
    if (
      !type ||
      !query ||
      (type !== "title" && type !== "number" && type !== "verse")
    ) {
      navigate("/");
      return;
    }

    HymnsApi.searchHymns(query as any, type as any).then(setHymns);

    return () => {
      setHymns(null);
    };
  }, [navigate, query, type]);

  if (!hymns) {
    return <Loading />;
  }

  return (
    <Row>
      <Col>
        <Card className="mb-4">
          <Card.Body>
            <h1 className="h3">
              Resultados da busca
            </h1>
            <p className="mb-0">
              <Badge bg="primary">{getSearchTypeLabel()}</Badge>{" "}
              <Badge bg="secondary">{query}</Badge>{" "}
              <span className="text-muted">
                {hymns.hymns.length === 0
                  ? "Nenhum resultado encontrado"
                  : `${hymns.hymns.length} hino${hymns.hymns.length !== 1 ? "s" : ""} encontrado${hymns.hymns.length !== 1 ? "s" : ""}`}
              </span>
            </p>
          </Card.Body>
        </Card>

        {hymns?.hymns.length === 0 ? (
          <Alert variant="info">
            <Alert.Heading>Nenhum resultado encontrado</Alert.Heading>
            <p>
              Tente pesquisar com outras palavras-chave ou use um tipo de busca
              diferente.
            </p>
          </Alert>
        ) : (
          <>
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
                HymnsApi.searchHymns(query as any, type as any, page).then(
                  setHymns
                );
              }}
            />
          </>
        )}
      </Col>
    </Row>
  );
}

export default Search;
