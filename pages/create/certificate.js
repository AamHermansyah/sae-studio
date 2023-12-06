import CreateCertificate from "../../components/Create/Certificate";
import useLoadingPageSettings from "../../hooks/useLoadingPageSettings";

function CreateCertificatePage(){
    // loading page settings
    const { loading } = useLoadingPageSettings()

    if(loading) return null
    
    return (
        <CreateCertificate />
    )
}

export default CreateCertificatePage