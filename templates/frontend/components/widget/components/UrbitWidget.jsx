//  Below you can find /widget/components.helloUrbit
//  To build test component, run "npm run component-build"
//  You can look for further testing instructions in src/app/hello-components/page.js

const Label = styled.span`
  font-size: 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
`;

const Form = styled.div`
  max-width: 300px;
  margin: 20px auto; 
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid #bbc0c1;
  border-radius: 10px;
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

const Button = styled.button`
width: auto;
padding: 5px;
padding-left:15px;
padding-right:15px;
margin-top: 10px;
margin-bottom:10px;
background-color: white;
border: 1px solid #bbc0c1;
color: black;
cursor: pointer;`;

const [response, setResponse] = useState("");
const [pokeVal, setPokeVal] = useState('');
const [app, setApp] = useState('')
const [path, setPath] = useState('')

//Urbit.ship - connects component to your ship. for testing purposes, set to 'zod'
Urbit.ship(`{props.ship}`)  
//Urbit.setTestApi - setting up UrbitAPI for fakeship, not needed if runs on ship
Urbit.setTestApi(`{props.host}`, `{props.code}`)


const handlePoke = () => {
    Urbit.pokeUrbit('hood', 'helm-hi', pokeVal)
      .then((res) => {
        console.log(`${pokeVal} been printed in dojo`)
      });
  };

const scryTo = (e) => {
    e.preventDefault();
    Urbit.scryUrbit(app, path)
    .then((res) => {
      setResponse(res);
    });
  }


return (
  <Container>
    <Section as="div" style={{ flexDirection: "column" }}>
        <Form>
            <Label>Poke Dojo</Label>
            <Input type="text" value={pokeVal} onChange={(e) => setPokeVal(e.target.value)} name="pokeVal" placeholder="hi"></Input>
            <Button type="submit" onClick={handlePoke}>Poke</Button>
        </Form>
        <Form>
            <Label>Scry to </Label>
            <Label>App</Label>
            <Input type="text" value={app} onChange={(e) => setApp(e.target.value)} name="app" placeholder="app"></Input>
            <Label>Path</Label>
            <Input type="text" value={path} onChange={(e) => setPath(e.target.value)} name="path" placeholder="/path"></Input>
            <Button onClick={scryTo}>Scry</Button>
        </Form>
    </Section>
    <Section>
      <TextArea value={response}></TextArea>
    </Section>
  </Container>
);

