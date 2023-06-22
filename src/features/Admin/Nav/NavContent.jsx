import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Bill from "../bill/bill";
import BillDetail from "../bill/billDetail";
import AddCategory from "../Category/AddCategory";
import Category from "../Category/Category";
import category from "../Category/Category";
import CheckPetAdmin from "../CheckPetAdmin/CheckPetAdmin";
import PetDetail from "../CheckPetAdmin/PetDetail";
import AddContact from "../Contact/AddContact";
import Contact from "../Contact/Contact";
import AddGallery from "../Gallery/AddGallery";
import Gallery from "../Gallery/Gallery";
import AddNew from "../New/AddNew";
import New from "../New/New";
import AddProduct from "../Product/AddProduct";
import Product from "../Product/Product";
import ScheduleDetail from "../Schedule/DetailSchedule";
import Schedule from "../Schedule/Schedule";
import AddService from "../Service/AddService";
import Service from "../Service/Service";
import AddSocialNetwork from "../SocialNetwork/AddSocialNetwork";
import SocialNetwork from "../SocialNetwork/SocialNetwork";
import Statistical from "../Statistical/Statistical";
import AddTag from "../Tag/AddTag";
import Tag from "../Tag/Tag";
import AddWeight from "../Weight/AddWeight";
import Weight from "../Weight/Weight";

export default function NavContent() {
  const { path } = useRouteMatch();
  return (
    <div className="NavContent">
      <Switch>
        <Route exact path={`${path}`} component={Statistical} />
        <Route exact path={`${path}/CheckPet`} component={CheckPetAdmin} />
        <Route
          exact
          path={`${path}/CheckPet/PetDetail/:id`}
          component={PetDetail}
        />
        <Route exact path={`${path}/New`} component={New} />
        <Route exact path={`${path}/New/AddNew`} component={AddNew} />
        <Route exact path={`${path}/New/AddNew/:id`} component={AddNew} />
        <Route exact path={`${path}/Bill`} component={Bill} />
        <Route
          exact
          path={`${path}/Bill/DetailBill/:id`}
          component={BillDetail}
        />
        <Route exact path={`${path}/Schedule`} component={Schedule} />
        <Route
          exact
          path={`${path}/Schedule/ScheduleDetail/:id`}
          component={ScheduleDetail}
        />
        <Route exact path={`${path}/Tag`} component={Tag} />
        <Route exact path={`${path}/Tag/AddTag`} component={AddTag} />
        <Route exact path={`${path}/Tag/AddTag/:id`} component={AddTag} />
        <Route exact path={`${path}/Category`} component={Category} />
        <Route
          exact
          path={`${path}/Category/AddCategory`}
          component={AddCategory}
        />
        <Route
          exact
          path={`${path}/Category/AddCategory/:id`}
          component={AddCategory}
        />
        <Route exact path={`${path}/Product`} component={Product} />
        <Route
          exact
          path={`${path}/Product/AddProduct`}
          component={AddProduct}
        />
        <Route
          exact
          path={`${path}/Product/AddProduct/:id`}
          component={AddProduct}
        />

        <Route exact path={`${path}/Service`} component={Service} />
        <Route
          exact
          path={`${path}/Service/AddService`}
          component={AddService}
        />
        <Route
          exact
          path={`${path}/Service/AddService/:id`}
          component={AddService}
        />
        <Route exact path={`${path}/Gallery`} component={Gallery} />
        <Route
          exact
          path={`${path}/Gallery/AddGallery`}
          component={AddGallery}
        />
        <Route
          exact
          path={`${path}/Gallery/AddGallery/:id`}
          component={AddGallery}
        />
        <Route exact path={`${path}/Weight`} component={Weight} />
        <Route exact path={`${path}/Weight/AddWeight`} component={AddWeight} />
        <Route
          exact
          path={`${path}/Weight/AddWeight/:id`}
          component={AddWeight}
        />
        <Route exact path={`${path}/Contact`} component={Contact} />
        <Route
          exact
          path={`${path}/Contact/AddContact`}
          component={AddContact}
        />
        <Route
          exact
          path={`${path}/Contact/AddContact/:id`}
          component={AddContact}
        />
        <Route exact path={`${path}/SocialNetwork`} component={SocialNetwork} />
        <Route
          exact
          path={`${path}/SocialNetwork/AddSocialNetwork`}
          component={AddSocialNetwork}
        />
        <Route
          exact
          path={`${path}/SocialNetwork/AddSocialNetwork/:id`}
          component={AddSocialNetwork}
        />
      </Switch>
    </div>
  );
}
