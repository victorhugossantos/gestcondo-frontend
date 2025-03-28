import Card from "../components/Card";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <div className="flex-1 p-8">
                <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
                {/* Cards para o dashboard*/}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <Card title="Finanças" description="Taxas de condomínio e pagamentos pendentes.">
                        <span className="text-blue-800">R$ 18.000,00</span>
                    </Card>

                    <Card title="Avisos" description="Ultimos avisos para o condominio">
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Aviso 1</li>
                            <li>Aviso 2</li>
                        </ul>
                    </Card>
                    <Card title="Pendencias"></Card>
                    <Card title="Encomendas"></Card>
                    <Card title="Quadro 02"></Card>
                </div>
            </div>


        </div>
    )
}

export default Dashboard;