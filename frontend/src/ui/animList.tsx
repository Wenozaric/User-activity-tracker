import { useState } from "react"
import { AnimListItem } from "./animListItem"

export interface Items{
    bool: boolean,
    id: string | undefined
}

export const AnimList = () => {
    const [openItem, setOpenItem] = useState<Items>({bool: false, id: ''})

    const switchOpenItem = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        console.log(event.currentTarget.dataset.id)
        console.log(openItem.id)
        if ( event.currentTarget.dataset.id == openItem.id){
            console.log('reverse')
            setOpenItem({
							bool: !openItem.bool,
							id: event.currentTarget.dataset.id,
						})
        }
        else setOpenItem({bool: true, id: event.currentTarget.dataset.id})
    }
    return (
			<>
				<AnimListItem
					onClick={switchOpenItem}
					description='Anti-loss technology'
					content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
					isOpen={openItem}
					id='1'
				/>
				<AnimListItem
					onClick={switchOpenItem}
					description='Move your data where you need it.'
					content='Seamlessly export your projects to PDF, CSV, or sync directly with tools like Slack and Notion. One click is all it takes to keep everyone in the loop.'
					isOpen={openItem}
					id='2'
				/>
				<AnimListItem
					onClick={switchOpenItem}
					description='Fully encrypted'
					content='We use industry-standard AES-256 encryption to protect your information. Only you hold the keys to your data—even we cant see whats inside.'
					isOpen={openItem}
					id='3'
				/>
				<AnimListItem
					onClick={switchOpenItem}
					description='Plenty of options'
					content='From dark mode to custom keyboard shortcuts and API integrations, adjust every detail to make the platform work exactly the way you want.'
					isOpen={openItem}
					id='4'
				/>
			</>
		)
}