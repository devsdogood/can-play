import { FilePond } from "react-filepond";
import { registerPlugin, FilePondFile } from "filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// filepond plugin for validating file type
registerPlugin(FilePondPluginFileValidateType);

type UploadWrapperProps = React.PropsWithChildren<{
    setFiles: (files: FilePondFile[]) => void;
}>;

const UploadWrapper: React.FC<UploadWrapperProps> = ({ setFiles, children }) => {
    return (
        <>
            <FilePond
                acceptedFileTypes={["text/csv", "application/csv"]}
                onupdatefiles={setFiles}
                labelIdle='Drag & drop your CSV file or <span class="filepond--label-action">browse</span>'
            />
            {children}
        </>
    )
}

export default UploadWrapper;
