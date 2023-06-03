import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { cls } from "@/utils/tailwindCss";
import { getWalletAuthKey } from "@/utils/auth";
import nearStore from "@/store/nearStore";

const Collection = () => {
  const router = useRouter();

  return <main>collection</main>;
};

export default Collection;
