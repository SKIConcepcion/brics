import loading from "../assets/loading.gif";
export default function Loading() {
return (
    <div class="flex items-center z-10000 justify-center h-screen">
    <img src={loading} alt="Loading" className="mx-auto w-27 h-18" />
    </div>
  );
}