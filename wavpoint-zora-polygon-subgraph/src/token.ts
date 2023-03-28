import {
	CreatedDrop as CreatedDropEvent,
	Token as FactoryContract,
} from "../generated/Token/Token"
import {
	Transfer as TransferEvent,
	NFT as NFTContract,
} from "../generated/templates/Token/NFT"
import { User, Drop, Token } from "../generated/schema"
import { NFT as NFTDatasource } from "../generated/templates"

export function handleCreatedDrop(event: CreatedDropEvent): void {
	let entity = new Drop(event.params.editionContractAddress.toHexString())
	entity.creator = event.params.creator
	entity.address = event.params.editionContractAddress
	entity.editionSize = event.params.editionSize
	let contract = NFTContract.bind(event.params.editionContractAddress)
	entity.name = contract.name()
	entity.uri = contract.contractURI()
	entity.root = contract.salesConfig().getPresaleMerkleRoot().toHexString()
	entity.symbol = contract.symbol()
	entity.splitAddress = contract.config().getFundsRecipient()
	entity.preSaleStart = contract.salesConfig().getPresaleStart()
	entity.preSaleEnd = contract.salesConfig().getPresaleEnd()
	entity.publicSaleStart = contract.salesConfig().getPublicSaleStart()
	entity.publicSaleEnd = contract.salesConfig().getPublicSaleEnd()
	entity.publicSalePrice = contract.salesConfig().getPublicSalePrice()
	entity.createdAt = event.block.timestamp
	entity.admin = contract.DEFAULT_ADMIN_ROLE()
	entity.save()
	NFTDatasource.create(event.params.editionContractAddress)
}

export function handleTransfer(event: TransferEvent): void {
	let token = Token.load(event.address.toHexString() + "-" + event.params.tokenId.toHexString())
	if (!token) {
		token = new Token(event.address.toHexString() + "-" + event.params.tokenId.toHexString())
		token.address = event.address
		token.collection = event.address.toHexString()
		token.tokenId = event.params.tokenId
		token.mintTime = event.block.timestamp
	}
	let user = User.load(event.params.to.toHexString())
	if (!user) {
		user = new User(event.params.to.toHexString())
		user.save()
	}
	token.owner = event.params.to.toHexString()
	token.save()
}
