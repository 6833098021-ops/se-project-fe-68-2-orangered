import FormComponent from "./FormComponent";

export default function CreateShopForm(){

  function handleSubmit(){

  }

  return(
    <FormComponent handleSubmit={handleSubmit}>
      <h1>Create New Shop</h1>
    </FormComponent>
  )
}