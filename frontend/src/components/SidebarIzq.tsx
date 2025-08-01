import { useEffect, useState } from "react";
import { formatFileSize } from "../utils";

type SidebarTypesProps = {
  file: File;
};

export default function SidebarIzq({ file }: SidebarTypesProps) {
  const [recordCount, setRecordCount] = useState<number | null>(null);
  const [analysisDate, setAnalysisDate] = useState<Date | null>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target?.result as string;
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
      setRecordCount(lines.length - 1); // -1 para excluir encabezado
      setAnalysisDate(new Date()); // Guarda la fecha actual
    };
    reader.readAsText(file);
  }, [file]);

  return (
    <>
      <aside
        className="w-full lg:w-80 flex-col flex-shrink-0 justify-between h-full lg:min-h-screen shadow-lg lg:shadow-2xl border-b lg:border-r lg:border-b-0 border-gray-200 bg-white lg:sticky lg:top-0 rounded-lg px-4 lg:px-6 py-6 lg:py-8 z-10"
        style={{
          boxShadow: "0 4px 16px 0 rgba(44, 62, 80, 0.08), 8px 0 32px 0 rgba(44, 62, 80, 0.10)",
        }}
      >
        <div className="bg-[#E4ECFF] rounded-xl shadow p-6 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <img src="/img/iconos/svg/csvFile.svg" className="w-6 h-6" alt="Icono de archivo CSV" />
            <span className="font-semibold text-lg">{file.name}</span>
          </div>
          <div className="text-sm text-gray-500 mb-2">Archivo actual</div>
          <div className="text-sm mb-1 flex justify-between">
            Fecha de análisis:{" "}
            <span className="text-[#134CCA] font-medium">
              {analysisDate
                ? analysisDate?.toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "Cargando..."}
            </span>
          </div>
          <div className="text-sm mb-1 flex justify-between">
            Registros: <span className="text-[#134CCA] font-medium">{recordCount !== null ? recordCount.toLocaleString() : "Cargando..."}</span>
          </div>
          <div className="text-sm mb-4 flex justify-between">
            Tamaño: <span className="text-[#134CCA] font-medium">{formatFileSize(file.size)}</span>
          </div>
        </div>
        <a href="/">
          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-[#094FC2] to-[#5A38AA] text-white font-bold shadow hover:opacity-90 transition cursor-pointer">
            <span className="inline-flex items-center gap-2">
              <img src="/img/iconos/svg/reupload.svg" className="w-5 h-5" alt="" />
              Subir nuevo archivo
            </span>
          </button>
        </a>
        {/* <div className="mt-10">
          <h2 className="font-bold text-2xl mb-2">Archivos recientes</h2>
          <ul>
            {mockFileInfo.recent.map((f) => (
              <li
                key={f.name}
                className="flex items-center gap-2 text-gray-400 text-sm mb-1"
              >
                <img
                  src="/img/iconos/svg/csvFile.svg"
                  className="w-4 h-4"
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <span className="text-black text-xl">{f.name}</span>
                  <span className="">{f.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div> */}
      </aside>
    </>
  );
}
