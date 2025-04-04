import UpdateProductForm from "./UpdateProductForm";

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  categoria?: { id: number; nombre: string };
  imagenUrl?: string;
};

type Props = {
  producto: Producto;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const UpdateProductModal: React.FC<Props> = ({ producto, isOpen, onClose, onSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
        <UpdateProductForm
          producto={producto}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
};

export default UpdateProductModal;
