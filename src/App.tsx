import React from 'react';
import { DocumentData, DocumentSnapshot, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { generateId } from './common/generateId';
import { adasSpecs, exteriorSpecs, generalSpecs, interiorSpecs, seguridadSpecs } from './specs-section'
import { Select } from './components/Select';
import { Accordion } from './components/Accordion';
import { SelVersionText, SelectContainer, SpecsCard, SpecsCardTitle, ToUpButton } from './App.styled';
import { Car } from './types/car';
import { SpecsContent } from './components/SpecsContent';
import { Segment, Brand, Model, Version, Loading } from './App.types';
import { Gallery } from './components/Gallery';
import { RequestQuote } from './components/RequestQuote';
import AppContext from './appContext';
import { UserCredential } from 'firebase/auth';
import Login from 'components/login';

function App() {

  const { db, isAdmin } = React.useContext(AppContext)

  const [ user, setUser ] = React.useState<UserCredential['user'] | null>(null)
  const [ showToUpButton, setShowToUpButton ] = React.useState<boolean>(false)
  const [segments, setSegments] = React.useState<Segment[]>([])
  const [segmentSelected, setSegmentSelected] = React.useState<Segment | undefined>(undefined)
  const [brands, setBrands] = React.useState<Brand[]>([])
  const [brandSelected, setBrandSelected] = React.useState<Brand | undefined>(undefined)
  const [models, setModels] = React.useState<Model[]>([])
  const [modelSelected, setModelSelected] = React.useState<Model | undefined>(undefined)
  const [versions, setVersions] = React.useState<Version[]>([])
  const [versionSelected, setVersionSelected] = React.useState<Version | undefined>(undefined)
  const [loading, setLoading] = React.useState<Loading>({
    segment: false,
    brand: false,
    model: false,
    version: false
  })

  const getSegments = async () => {
    if (!db) return
    setLoading( prev => ({...prev, segment: true}))
    const q = query(
      collection(db, 'segmentos')
    )
    const querySnapshot: DocumentData = await getDocs(q);
    const segmentList: Segment[] = querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data());
    setSegments(segmentList)
    setLoading( prev => ({...prev, segment: false}))
  }

  const getBrandBySegment = async (segmentId?: string) => {
    if (!db) return
    setLoading( prev => ({...prev, brand: true}))
    const wheres = []
    if (segmentId) wheres.push(where("segment", "==", segmentId))
    const q = query(
      collection(db, 'marca'),
      ...wheres
    )
    const querySnapshot: DocumentData = await getDocs(q);
    const brandList: Brand[] = querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data());
    setBrands(brandList)
    setLoading( prev => ({...prev, brand: false}))
  }

  const getModelByBrand = async (brandId: string) => {
    if (!db) return
    setLoading( prev => ({...prev, model: true}))
    const q = query(
      collection(db, 'modelo'),
      where("brand", "==", brandId)
    )
    const querySnapshot: DocumentData = await getDocs(q);
    const modelList: Model[] = querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data());
    setModels(modelList)
    setLoading( prev => ({...prev, model: false}))
  }

  const getVersionByModel = async (modelId: string) => {
    if (!db) return
    setLoading( prev => ({...prev, version: true}))
    const q = query(
      collection(db, 'car'),
      where("modelo", "==", modelId)
    )
    const querySnapshot: DocumentData = await getDocs(q);
    const carList: Car[] = querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data());
    const versionList = await Promise.all(carList.map(async (car, index) => {
      return {
        ...car,
        id: await generateId(car.version, 6),
        label: car.version,        
        index,
      }
    }))
    setVersions(versionList as Version[])
    setLoading( prev => ({...prev, version: false}))
  }

  // inicio
  React.useEffect(() => {
    getSegments()
    getBrandBySegment()
    const handleScroll = () => {
      const top = window.scrollY;
      setShowToUpButton(top > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteSegment = async () => {
    if (!db) return
    const docRef = doc(db, 'segmentos', segmentSelected!.id)
    await deleteDoc(docRef);
    setSegmentSelected(undefined)
    getSegments()
  }

  const deleteBrand = async () => {
    if (!db) return
    const docRef = doc(db, 'marca', brandSelected!.id)
    await deleteDoc(docRef);
    setBrandSelected(undefined)
    getBrandBySegment(brandSelected!.segment)
  }

  const deleteModel = async () => {
    if (!db) return
    const docRef = doc(db, 'modelo', modelSelected!.id)
    await deleteDoc(docRef);
    setModelSelected(undefined)
    getModelByBrand(brandSelected!.id)
  }

  const deleteVersion = async () => {
    if (!db) return
    const carId = versionSelected!.segment + brandSelected!.id + modelSelected!.id + versionSelected!.id
    const docRef = doc(db, 'car', carId )
    await deleteDoc(docRef);
    setVersionSelected(undefined)
    getVersionByModel(modelSelected!.id)
  }

  return (
    <>
      {isAdmin && <div>
        <button disabled={!segmentSelected?.id} onClick={deleteSegment}>Delete Segment</button>
        <button disabled={!brandSelected?.id} onClick={deleteBrand}>Delete Brand</button>
        <button disabled={!modelSelected?.id} onClick={deleteModel}>Delete Model</button>
        <button disabled={!versionSelected?.id} onClick={deleteVersion}>Delete Version</button>
      </div>}

      {!user?.uid && <Login setUser={setUser} />}

      <SelectContainer>

        <Select
          label='Segmento'
          name='segment'
          options={segments}
          selected={segmentSelected}
          onChange={ item => {
            setSegmentSelected(item)
            if (item?.id) getBrandBySegment(item.id)
              else getBrandBySegment()
            setBrandSelected(undefined)
            setModelSelected(undefined)
            setModels([])
            setVersionSelected(undefined)
            setVersions([])
          }}
          isLoading={loading.segment}
        />

        <Select
          label='Marca'
          name='brand'
          options={brands}
          selected={brandSelected}
          onChange={ item => {
            setBrandSelected(item)
            if (item?.id) getModelByBrand(item.id)
            setModelSelected(undefined)
            setModels([])
            setVersionSelected(undefined)
            setVersions([])
          }}
          isLoading={loading.brand}
        />

        <Select
          label='Modelo'
          name='model'
          options={models}
          selected={modelSelected}
          onChange={ item => {
            setModelSelected(item)
            if (item?.id) getVersionByModel(item?.label)
            setVersionSelected(undefined)
            setVersions([])
          }}
          isLoading={loading.model}
        />

        <Select
          label='Version'
          name='version'
          options={versions}
          selected={versionSelected}
          onChange={ item => {
            setVersionSelected(item)
          }}
          isLoading={loading.version}
        />

      </SelectContainer>

      {modelSelected?.id && brandSelected?.id &&
        <Gallery
          marca={brandSelected.label}
          modelo={modelSelected.label}
        />
      }

      {versionSelected?.id && <RequestQuote />}
      {!versionSelected?.id && modelSelected?.id && <SelVersionText>Seleccione una versión para ver más detalles</SelVersionText>}

      {versionSelected?.id && <SpecsCard>
        <SpecsCardTitle>Características técnicas</SpecsCardTitle>
        <Accordion options={[
            { label: 'General', content: <SpecsContent carData={versionSelected} specs={generalSpecs || []} />},
            { label: 'Interior', content: <SpecsContent carData={versionSelected} specs={interiorSpecs || []} />},
            { label: 'Exterior', content: <SpecsContent carData={versionSelected} specs={exteriorSpecs || []} />},
            { label: 'Seguridad', content: <SpecsContent carData={versionSelected} specs={seguridadSpecs || []} />},
            { label: 'ADAS', content: <SpecsContent carData={versionSelected} specs={adasSpecs || []} />},
          ]}
        />
      </SpecsCard>}

      {showToUpButton && <ToUpButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>&#8593;</ToUpButton>}

    </>
  );
}

export default App;
