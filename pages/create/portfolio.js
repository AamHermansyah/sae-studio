import CreatePortfolio from "../../components/Create/Portfolio";
import useLoadingPageSettings from "../../hooks/useLoadingPageSettings";

function CreatePortfolioPage(){
    // loading page settings
    const { loading } = useLoadingPageSettings()

    if(loading) return null
    
    return (
        <CreatePortfolio />
    )
}

export default CreatePortfolioPage