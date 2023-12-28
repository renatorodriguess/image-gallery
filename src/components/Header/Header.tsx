import { ImageGallery } from "../../types/global.types";
import CheckboxIcon from "../../assets/icons/CheckboxIcon";
import EmptyCheckboxIcon from "../../assets/icons/EmptyCheckboxIcon";

interface IHeaderProps {
  onDelete: (selectedItems: ImageGallery[]) => void;
  galleryData: ImageGallery[];
}

const HeaderBlock = ({ onDelete, galleryData }: IHeaderProps) => {
  const selectedItems = galleryData.filter((item) => item.isSelected);

  return (
    <div className="flex items-center justify-between gap-4 p-5">
      {selectedItems.length > 0 ? (
        <>
          <h2 className="text-lg md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
            {selectedItems.length > 0 ? (
              <CheckboxIcon className="text-blue-600" />
            ) : (
              <EmptyCheckboxIcon />
            )}
            <span>
              {selectedItems.length > 1
                ? `${selectedItems.length} Arquivos Selecionados`
                : `${selectedItems.length} Arquivos Selecionados`}
            </span>
          </h2>
          <button
            className="font-semibold text-red-500 text-base md:text-lg hover:underline"
            onClick={
              selectedItems.length > 0
                ? () => onDelete(selectedItems)
                : () => {}
            }
          >
            
            {selectedItems.length > 1 ? `Deletar Arquivos ` : "Deletar Arquivos"}
          </button>
        </>
      ) : (
        <p className="text-2xl font-semibold bg-gradient-to-l from-orange-100 to-orange-200 text-gray-800 rounded p-2">Galeria de Imagens</p>
      )}
    </div>
  );
};

export default HeaderBlock;