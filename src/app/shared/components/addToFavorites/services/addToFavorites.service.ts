import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {ArticleInterface} from '../../../types/article.interface'
import {HttpClient} from '@angular/common/http'
import {ArticleResponseInterface} from '../../../types/articleResponse.interface'

@Injectable()
export class AddToFavoritesService {
  constructor(private http: HttpClient) {
  }
  addToFavorites(slug: string): Observable<ArticleInterface>{
    const url = this.getUrl(slug)
    return this.http
      .post<ArticleResponseInterface>(url, {})
      .pipe(map(this.getArticle))
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface>{
    const url = this.getUrl(slug)

    return this.http
      .delete<ArticleResponseInterface>(url)
      .pipe(map(this.getArticle))
  }

  getUrl(slug: string): string{
    return `http://localhost:3000/api/article/${slug}/favorite`
  }

  getArticle(response: ArticleResponseInterface): ArticleInterface {
    return response.article
  }

}
