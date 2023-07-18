"use client";
import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import {
  Scene,
  PerspectiveCamera,
  AmbientLight,
  WebGLRenderer,
  Matrix4,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";

const mapOptions = {
  mapId: process.env.NEXT_PUBLIC_MAP_ID,
  center: { lat: 47.61195, lng: -122.3386 },
  zoom: 14,
  disableDefaultUI: true,
  heading: 20,
  tilt: 25,
};

export default function Maps() {
  return (
    <div className="m-5">
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <MapComponent />
      </Wrapper>
    </div>
  );
}

function MapComponent() {
  const [map, setMap] = useState();
  const [lat, setLat] = useState("47.61195");
  const [lng, setLng] = useState("-122.33860");
  const ref = useRef();
  const markerRef = useRef();
  const overlayRef = useRef();

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedArea, setSelectedArea] = useState("Downtown");

  useEffect(() => {
    const instance = new window.google.maps.Map(ref.current, mapOptions);
    setMap(instance);
    markerRef.current = new window.google.maps.Marker({ map: instance });
    overlayRef.current = createTransitionOverlay(instance);
  }, []);

  const handleButtonClick = (newlat, newlng, newname) => {
    setLat(newlat);
    setLng(newlng);
    mapOptions.zoom = 13;
    overlayRef.current = createTransitionOverlay(map);
    map.setCenter({ lat: parseFloat(newlat), lng: parseFloat(newlng) });
    setSelectedArea(newname);
  };

  return (
    <div>
      <div className="flex flex-row gap-10">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-sm font-semibold">Trending Seattle</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <h1>All Neighborhoods</h1>
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2 space-x-2">
          <Button
              variant="ghost"
              className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"
              onClick={() =>
                handleButtonClick("47.61195", "-122.33860", "Downtown")
              }
            >
              Downtown
            </Button>
            <Button
              variant="ghost"
              className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"
              onClick={() =>
                handleButtonClick("47.61411", "-122.31691", "Capitol Hill")
              }
            >
              Capitol Hill
            </Button>
            <Button
              variant="ghost"
              className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"
              onClick={() =>
                handleButtonClick("47.66873", "-122.38217", "Ballard")
              }
            >
              Ballard
            </Button>
            <Button
              variant="ghost"
              className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"
              onClick={() =>
                handleButtonClick("47.65165", "-122.35175", "Fremont")
              }
            >
              Fremont
            </Button>
            <Button
              variant="ghost"
              className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"
              onClick={() =>
                handleButtonClick("47.68587", "-122.33743", "Greenlake")
              }
            >
              Greenlake
            </Button>
          </CollapsibleContent>
          <Button
            variant="ghost"
            className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm bg-green-200"
          >
            View: {selectedArea}
          </Button>
        </Collapsible>
      </div>
      <div ref={ref} className="min-h-screen m-5 rounded-lg"></div>
    </div>
  );
}

function createTransitionOverlay(map) {
  const overlay = new google.maps.WebGLOverlayView();
  let renderer, scene, camera, loader;

  overlay.onAdd = () => {
    scene = new Scene();
    camera = new PerspectiveCamera();
    const light = new AmbientLight(0xffffff, 0.9);
    scene.add(light);

    loader = new GLTFLoader();

    loader.loadAsync("models/scene.gltf").then((object) => {
      const group = object.scene;
      group.scale.setScalar(25);
      group.rotation.set(Math.PI / 2, 0, 0);
      group.position.setZ(-120);
      scene.add(group);
    });
  };

  overlay.onContextRestored = ({ gl }) => {
    renderer = new WebGLRenderer({
      canvas: gl.canvas,
      context: gl,
      ...gl.getContextAttributes(),
    });
    renderer.autoClear = false;

    loader.manager.onLoad = () => {
      renderer.setAnimationLoop(() => {
        map.moveCamera({
          tilt: mapOptions.tilt,
          heading: mapOptions.heading,
          zoom: mapOptions.zoom,
        });
        if (mapOptions.tilt < 70) {
          mapOptions.tilt += 0.09;
        } else if (mapOptions.zoom < 17) {
          mapOptions.zoom += 0.01;
        } else if (mapOptions.heading < 100) {
          mapOptions.heading += 0.2;
        } else {
          renderer.setAnimationLoop(null);
        }
      });
    };
  };

  overlay.onDraw = ({ transformer }) => {
    const matrix = transformer.fromLatLngAltitude({
      lat: mapOptions.center.lat,
      lng: mapOptions.center.lng,
      altitude: 120,
    });

    camera.projectionMatrix = new Matrix4().fromArray(matrix);
    overlay.requestRedraw();
    renderer.render(scene, camera);
    renderer.resetState();
  };

  overlay.setMap(map);
  return overlay;
}
