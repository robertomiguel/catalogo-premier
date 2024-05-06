import React from 'react'
import styled from 'styled-components'
import AppContext from '../appContext'

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: 40px;
`

const PicCard = styled.div`
    border-radius: 15px;
    overflow: hidden;
    padding: 3px;
    background-color: white;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 15px;
    }
    &:hover {
        box-shadow: var(--box-shadow);
        cursor: pointer;
    }    

`

interface GalleryProps {
    marca: string
    modelo: string
}

interface GoogleImageSearchResponse {
    kind: string;
    url: {
        type: string;
        template: string;
    };
    queries: {
        request: {
            title: string;
            totalResults: string;
            searchTerms: string;
            count: number;
            startIndex: number;
            inputEncoding: string;
            outputEncoding: string;
            safe: string;
            cx: string;
            searchType: string;
        }[];
        nextPage: {
            title: string;
            totalResults: string;
            searchTerms: string;
            count: number;
            startIndex: number;
            inputEncoding: string;
            outputEncoding: string;
            safe: string;
            cx: string;
            searchType: string;
        }[];
    };
    context: {
        title: string;
    };
    searchInformation: {
        searchTime: number;
        formattedSearchTime: string;
        totalResults: string;
        formattedTotalResults: string;
    };
    items: {
        kind: string;
        title: string;
        htmlTitle: string;
        link: string;
        displayLink: string;
        snippet: string;
        htmlSnippet: string;
        mime: string;
        fileFormat: string;
        image: {
            contextLink: string;
            height: number;
            width: number;
            byteSize: number;
            thumbnailLink: string;
            thumbnailHeight: number;
            thumbnailWidth: number;
        };
    }[];
}

interface Photo {
    full: string;
    thumb: string;
}

export const Gallery = ({ marca, modelo }: GalleryProps) => {

    const { isAdmin } = React.useContext(AppContext)

    const [ phList, setPhList ] = React.useState<Photo[]>([])

    const getPhotos = async (search: string) => {
        console.log('search:', search);
        console.log(encodeURIComponent(search));
        const params = {
            q: search,
            cx: process.env.REACT_APP_GOOGLE_CX,
            searchType: 'image',
            key: process.env.REACT_APP_GOOGLE_API_KEY,
            num: 10,
        };
        const url = new URL(`https://www.googleapis.com/customsearch/v1`);
        url.search = new URLSearchParams(params as any).toString();

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = (await response.json()) as GoogleImageSearchResponse;
            console.log(data);
            const { items = [] } = data;
            const photos = items.map((item) => ({
                full: item.link,
                thumb: item.image.thumbnailLink,
            }));
            setPhList(photos);
          } catch (error) {
            console.error('pexel errors:', error);
            return null;
          }
    }

    const click = () => {
        getPhotos(`car ${marca} ${modelo} outside interior`)
    }

  return (
    <div>
      <div>
        {isAdmin && <button onClick={click}>cargar fotos</button>}
        <Container>
            {phList.map((ph, index) => (
                <PicCard key={`pic-${index}`}>
                    <img src={ph.thumb} alt={modelo} />
                </PicCard>
            ))}
        </Container>
      </div>
    </div>
  )
}