import React from 'react';
import { DocumentData, DocumentSnapshot, collection, getDocs, query, where } from 'firebase/firestore'
import { generateId } from './common/generateId';
import { adasSpecs, exteriorSpecs, generalSpecs, interiorSpecs, seguridadSpecs } from './specs-section'
import { Select } from './components/Select';
import { Accordion } from './components/Accordion';
import { SelectContainer, SpecsCard, SpecsCardTitle } from './App.styled';
import { Car } from './types/car';
import { SpecsContent } from './components/SpecsContent';
import { AppProps, Segment, Brand, Model, Version, Loading } from './App.types';

function App({ db }: AppProps) {

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
    setLoading( prev => ({...prev, segment: true}))
    const q = query(
      collection(db, 'segmentos')
    )
    const querySnapshot: DocumentData = await getDocs(q);
    const segmentList: Segment[] = querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data());
    setSegments(segmentList)
    setLoading( prev => ({...prev, segment: false}))
  }

  const getBrandBySegment = async (segmentId: string) => {
    setLoading( prev => ({...prev, brand: true}))
    const q = query(
      collection(db, 'marca'),
      where("segment", "==", segmentId)
    )
    const querySnapshot: DocumentData = await getDocs(q);
    const brandList: Brand[] = querySnapshot.docs.map((doc: DocumentSnapshot) => doc.data());
    setBrands(brandList)
    setLoading( prev => ({...prev, brand: false}))
  }

  const getModelByBrand = async (brandId: string) => {
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

  React.useEffect(() => {
    getSegments()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>

      <SelectContainer>

        <Select
          label='Segmento'
          name='segment'
          options={segments}
          selected={segmentSelected}
          onChange={ item => {
            setSegmentSelected(item)
            if (item?.id) getBrandBySegment(item.id)
            setBrandSelected(undefined)
            setBrands([])
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

    </>
  );
}

export default App;
