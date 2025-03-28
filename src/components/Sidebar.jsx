// src/components/Sidebar.jsx
import React from "react";
import { List, ListItem, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import {BuildingOfficeIcon, CalendarDaysIcon, ChartBarIcon, ClipboardDocumentCheckIcon, CubeIcon, CurrencyDollarIcon, DocumentArrowDownIcon, HomeIcon, MegaphoneIcon, UserGroupIcon, UserPlusIcon, UsersIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const location = useLocation(); // Pega a URL atual
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path !== "#") navigate(path); //
  };

  const menuItems = [
    { label: "Início", path: "/dashboard", icon: HomeIcon},
    { label: "Avisos", path: "/avisos" , icon: MegaphoneIcon},
    { label: "Moradores", path: "/moradores", icon: UserGroupIcon, disabled: false},
    { label: "Unidades", path: "#", icon: BuildingOfficeIcon, disabled: true},
    { label: "Encomendas", path: "#", disabled: true, icon: CubeIcon},
    { label: "Tarefas", path: "#", disabled: true, icon: ClipboardDocumentCheckIcon},
    { label: "Finanças", path: "#", disabled: true, icon: CurrencyDollarIcon },
    { label: "Reservas", path: "#", disabled: true, icon: CalendarDaysIcon },
    { label: "Serviços", path: "#", disabled: true, icon: WrenchScrewdriverIcon },
    { label: "Reuniões", path: "#", disabled: true, icon: UsersIcon },
    { label: "Equipe", path: "#", disabled: true , icon: ChartBarIcon},
    { label: "Documentos", path: "#", disabled: true , icon: DocumentArrowDownIcon},
  ];


  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col p-4 border-r border-gray-700">
      {/* Header */}
      <div className="mb-8 px-4 py-6">
        <Typography variant="h4" className="flex items-center gap-2 font-bold text-blue-400">
          GestCondo
        </Typography>  
      </div>
      
      {/* Menu Items */}
      <List className="flex-1 space-y-1 px-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path; // verifica se o item está ativo
          const Icon = item.icon; // pega o icone do item

          return (
            <ListItem
              key={item.label}
              onClick={() => handleNavigation(item.path)}
              disabled={item.disabled}
              className={`group flex items-center gap-3 p-3 rounded-xl transition-all
                ${isActive ? "bg-blue-800/50 text-blue-300 font-semibold border-1-4 border-blue-400"
                  : "hover:bg-blue-700/50 hover:pl-4"}
                ${item.disabled ? "opacity-40 cursor-not-alloweed" : ""}`}
                role="link"
                aria-current={isActive ? "page" : undefined}
            >
              <Icon className= {`w-6 h-6 ${isActive ? "text-blue-400" : "text-gray-300"}`}>
                {item.icon}
              </Icon>
              <Typography className={`text-sm ${isActive ? "text-blue-200" : "text-gray-300"}`}>
                {item.label}
              </Typography>

            </ListItem>
          );
        })}
      </List>
        
        {/* Footer */}
        <div className="pt-4 border-t border-gray-700/50 mt-4">
          <Typography variant="small" className="text-gray-400 text-xs">
          © 2025 GestCondo v0.1.0
          </Typography>

        </div>
    </div>
  );
};

export default Sidebar;
