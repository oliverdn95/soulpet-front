import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { Clientes } from "./pages/Clientes/Clientes";
import { EditaCliente } from "./pages/EditaCliente/EditaCliente";
import { NovoPet } from "./pages/NovoPet/NovoPet";
import { EditaPet } from "./pages/EditaPet/EditaPet";
import { Pets } from "./pages/Pets/Pets";
import { NovoProduto} from "./pages/NovoProduto/NovoProduto.jsx"
import { EditaProduto} from "./pages/EditaProduto/EditaProduto"
import { Dashboard } from "./pages/DashBoard/Dashboard";
import { Produtos } from "./pages/Produtos/Produtos";
import { NovoServico } from "./pages/NovoServico/NovoServico.jsx"
import { NovoAgendamento } from "./pages/NovoAgendamento/NovoAgendamento";
import { Servicos } from "./pages/Servicos/Servicos";
import { Agendamentos } from "./pages/Agendamentos/Agendamentos";
import { EditaAgendamento } from "./pages/EditaAgendamento/EditaAgendamento";
import { EditaServico } from "./pages/EditaServico/EditaServico";
import { Pedidos } from "./pages/Pedidos/Pedidos";
import { NovoPedido } from "./pages/NovoPedido/NovoPedido";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
         <Route path="/" element={<Home />} > 
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />

          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/novo" element={<NovoPet />} />
          <Route path="/pets/editar/:id" element={<EditaPet />} />

          <Route path="/produtos" element={<Produtos/>} />
          <Route path="/produtos/novo" element={<NovoProduto/>}/>
          <Route path="/produtos/editar/:id" element={<EditaProduto/>}/>

          <Route path="/servicos" element={<Servicos />}/>
          <Route path="/servicos/novo" element={<NovoServico />} />
          <Route path="/servicos/editar/:id" element={<EditaServico />} />

          <Route path="/agendamentos" element={<Agendamentos />}/>
          <Route path="/agendamentos/novo" element={<NovoAgendamento />}/>
          <Route path="/agendamentos/editar/:id" element={<EditaAgendamento/>}/>

          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedidos/novo" element={<NovoPedido />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
