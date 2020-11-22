import React from "react";
import Section from "./section";
import Header from "./header";

export default function SliceZone({ sliceZone }) {
  return sliceZone.map((slice) => {
    switch (slice.slice_type) {
      case "header":
        return <Header slice={slice.primary} />;
      case "section":
        return <Section slice={slice.primary} />;
      default:
        return null;
    }
  });
}
