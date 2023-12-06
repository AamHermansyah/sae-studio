import CreateTestimonial from "../../components/Create/Testimonial";
import useLoadingPageSettings from "../../hooks/useLoadingPageSettings";

function CreateTestimonialPage(){
    // loading page settings
    const { loading } = useLoadingPageSettings()

    if(loading) return null
    
    return (
        <CreateTestimonial />
    )
}

export default CreateTestimonialPage