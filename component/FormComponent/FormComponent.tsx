export default function FormComponent({
  children, 
  handleSubmit
}:{
  children: React.ReactNode, 
  handleSubmit: (e: React.SyntheticEvent)=>void}){
  return(
    <form onSubmit={handleSubmit} action="submit" className="bg-[#0f172a]/50 flex flex-col items-center p-4 gap-4 rounded-lg border border-gray-700 text-gray-500 text-center text-xs italic">
      {children}
    </form>
  )
}