import Transak from "@biconomy/transak"

export default function AddFundsButton(props) {
	async function add() {
	
        const transak = new Transak('STAGING', {
            walletAddress: props.address,
            userData: {
              firstName: props.user?.name || '',
              email: props.user?.email || '',
            },
          });
          transak.init();
	}

	return (
		<button 
        className="absolute lg:right-6 lg:top-6 lg:py-3 border-[#FF6700] border-2 lg:px-4 md:top-8 md:right-10 md:py-3 md:px-4 top-10 right-10 py-4 px-2"
        onClick={add}>
			+
		</button>
	)
}
