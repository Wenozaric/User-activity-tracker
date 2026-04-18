import { useNavigate } from 'react-router-dom'

interface Button{
    className?: string,
    url: string,
    text?: string,
    child?: React.ReactNode
}

export const RedirectButton = (probs: Button) => {
	const navigate = useNavigate()
	return (
		<button className={probs.className} onClick={() => navigate(probs.url)}>
			{probs.text}
            {probs.child}
		</button>
	)
}