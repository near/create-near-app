const Label = styled.span`
  font-size: 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5; /* Light grey background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid #ccc; /* Faint grey border */
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  font-family: inherit;
  resize: none; /* Optional: Disables resizing */
`;

const Button = styled.button``;
const [response, setResponse] = useState("");
//console.log(Urbit)
const urbitPlayground = () => {
  const setShip = Urbit.ship('zod')
return (
  <Container>
    <Section as="div" style={{ flexDirection: "column" }}>
      <Label>{setShip}</Label>
      <Button
        onClick={() => {
          Urbit.pokeUrbit('near-handler', 'near-handler-action', {
            // hard-coded dummy pubkey
            'add': '0x11d9.2405.6c6f.f37a.675a.b2f4.0c99.8cfb.ea8b.f032.c83e.79a6.5305.72eb.0e9f.08c0'
          }).then((res) => {
            console.log(Urbit)
            setResponse(res);
          });
        }}
      >
        pokeUrbit
      </Button>
      <Button
        onClick={() => {
          Urbit.pokeNearHandler({
            'del': '0x11d9.2405.6c6f.f37a.675a.b2f4.0c99.8cfb.ea8b.f032.c83e.79a6.5305.72eb.0e9f.08c0'
          })
        }}
      >
        pokeNearHandler
      </Button>
      <Button
        onClick={() => {
          Urbit.scryNearHandler("/accs")
          .then((res) => {
            setResponse(res);
          });
        }}
      >
        scryNearHandler /accs
      </Button>
    </Section>
    <Section as="div" style={{ flexDirection: "column" }}>
      <SectionTitle>Console</SectionTitle>
      <TextArea
        placeholder="Output from testing will appear here..."
        value={response}
        disabled
      />
    </Section>
  </Container>
);
      }
export default urbitPlayground