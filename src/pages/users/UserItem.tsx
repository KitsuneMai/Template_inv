import  { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "../../components/CustomButton";

const UserItem = ({ user }:any) => {
    const [open, setOpen] = useState(false);
  
    return (
      <div className="border-b py-2 px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">{user.email}</h2>
          <CustomButton
            label={open ? "Ocultar" : "Ver más"}
            onClick={() => setOpen(!open)}
            size="sm"
            className="text-sm" // Opcional: si quieres ajustar más el tamaño
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-2">
                <p className="text-sm">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm">
                  <strong>Rol:</strong> {user.roles}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
};

export default UserItem