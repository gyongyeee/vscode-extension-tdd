import TestSuite from "../interface";
import Golang from "./golang";
import Jest from "./jest";

const _suites: TestSuite[] = [new Jest(), new Golang()];

export default _suites;
