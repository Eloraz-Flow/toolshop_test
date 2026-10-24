class FavoritiesPage{
    constructor(page){
        this.page=page;
        this.Favourites_Btn=page.getByRole("button", {name:"Add to favourites"});

    }

    async successful_Product_Fav(){
        await this.Favourites_Btn.click();
    }
}
export default FavoritiesPage;